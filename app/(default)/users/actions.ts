"use server";

import { prisma } from "@/prisma";

export async function getUsersData() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            role: true,
            verified: true
        },
        orderBy: {
            username: "asc"
        }
    });
    
    const unverifiedUsers = [];
    const verifiedUsers = [];
    
    for (const user of users) {
        if (user.verified) {
            verifiedUsers.push(user);
        } else {
            unverifiedUsers.push(user);
        }
    }
    
    return { verifiedUsers, unverifiedUsers };
}

export async function verifyUserData(id: string) {
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            verified: true
        }
    });
}

export async function updateUserRole(id: string, newRole: string) {
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
}

export async function deleteUserData(id: string) {
    await prisma.user.delete({
        where: {
            id: id
        }
    });
}