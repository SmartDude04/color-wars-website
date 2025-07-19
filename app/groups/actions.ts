"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { getGroupsCached } from "@/cached";

export async function getGroups() {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return [];
    }

    return getGroupsCached();
}

export async function addGroup(name: string, colorId: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Confirm colorId is valid
    const colorExists = await prisma.color.count({
        where: {
            id: colorId
        }
    }) === 1;

    if (!colorExists) {
        return;
    }

    // Make sure group name is unique
    const groupAlreadyExists = await prisma.group.count({
        where: {
            name: name
        }
    }) === 1;

    if (groupAlreadyExists) {
        return;
    }

    // Finally, add the group
    await prisma.group.create({
        data: {
            name: name,
            colorId: colorId
        }
    });

    // Revalidate the groups tag
    revalidateTag("groups");
}

export async function updateGroup(id: string, name: string, colorId: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Confirm colorId is valid
    const colorExists = await prisma.color.count({
        where: {
            id: colorId
        }
    }) === 1;

    if (!colorExists) {
        return;
    }

    // Confirm name is unique
    const groupAlreadyExists = await prisma.group.count({
        where: {
            name: name,
            NOT: {
                id: id
            }
        }
    });

    if (groupAlreadyExists) {
        return;
    }

    // Update the data
    await prisma.group.update({
        where: {
            id: id
        },
        data: {
            name: name,
            colorId: colorId
        }
    });

    // Revalidate the groups
    revalidateTag("groups");
}

export async function deleteGroup(id: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Delete any points associated with this group
    await prisma.point.deleteMany({
        where: {
            group: {
                id: id
            }
        }
    });

    // Revalidate the colors tag
    revalidateTag("colors");

    await prisma.group.delete({
        where: {
            id: id
        }
    });

    revalidateTag("groups");
}