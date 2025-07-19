"use server";

import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { getUsersCached } from "@/app/cached";

export async function getUsersData() {
    const session = await auth();
    if (session?.user.role !== "admin" && session?.user.role !== "specialist") {
        return { verifiedUsers: [], unverifiedUsers: [] };
    }

    const users = await getUsersCached();
    
    const unverifiedUsers = [];
    const verifiedUsers = [];
    
    for (const user of users) {
        if (user.verified) {
            verifiedUsers.push(user);
        } else {
            unverifiedUsers.push(user);
        }
    }

    if (session?.user.role === "admin") {
        return { verifiedUsers, unverifiedUsers };
    }

    return { verifiedUsers: [], unverifiedUsers };
}

export async function verifyUserData(id: string) {
    const session = await auth();
    if (session?.user.role !== "admin" && session?.user.role !== "specialist") {
        return;
    }

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            verified: true
        }
    });

    // Revalidate user tag
    revalidateTag("users");
}

export async function updateUserRole(id: string, newRole: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Make sure the user can't update their own role
    if (session?.user.id === id) {
        return;
    }

    // Confirm role is within the valid roles
    if (newRole === "user" || newRole === "specialist" || newRole === "admin") {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                role: newRole
            }
        });
    }

    // Revalidate user tag
    revalidateTag("users");
}

export async function deleteUserData(id: string) {
    const session = await auth();
    if (session?.user.role !== "admin" && session?.user.role !== "specialist") {
        return;
    }

    // Make sure user can't delete themselves
    if (session?.user.id === id) {
        return;
    }

    if (session.user.role === "admin") {
        // If the user is an admin, they may be deleting a user with points. These need to be removed
        await prisma.point.deleteMany({
            where: {
                userId: id
            }
        });

        // Make sure to revalidate appropriate tags
        revalidateTag("points");

        // Then delete the user themselves
        await prisma.user.delete({
            where: {
                id: id
            }
        });

    } else if (session.user.role === "specialist") {
        // If the user is a specialist, make sure they can only delete unverified users
        await prisma.user.delete({
            where: {
                id: id,
                verified: false
            }
        });
    }

    // Revalidate user tag
    revalidateTag("users");
}