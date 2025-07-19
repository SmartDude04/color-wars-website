"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";
import { getColorsCached } from "@/app/cached";

export async function getColors() {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return [];
    }

    return getColorsCached();
}

export async function addColor(name: string, hexColor: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Confirm hexColor is a valid hex string
    const regex = /^#([A-F0-9]{6}|[A-F0-9]{3})$/;
    if (!regex.test(hexColor)) {
        return;
    }

    // Make sure name is unique
    const colorAlreadyExists = await prisma.color.count({
        where: {
            name: name
        }
    }) === 1;

    if (colorAlreadyExists) {
        return;
    }

    await prisma.color.create({
        data: {
            name: name,
            hexColor: hexColor,
        }
    });

    // Revalidate the colors tag
    revalidateTag("colors");
}

export async function updateColor(id: string, name: string, hexColor: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Confirm hexColor is a valid hex string
    const regex = /^#([A-F0-9]{6}|[A-F0-9]{3})$/;
    if (!regex.test(hexColor)) {
        return;
    }

    // Make sure name is unique
    const colorAlreadyExists = await prisma.color.count({
        where: {
            name: name,
            NOT: {
                id: id
            }
        }
    }) === 1;

    if (colorAlreadyExists) {
        return;
    }

    await prisma.color.update({
        where: {
            id: id
        },
        data: {
            name: name,
            hexColor: hexColor
        }
    });

    // Revalidate the colors tag
    revalidateTag("colors");
}

export async function deleteColor(id: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Delete any points associated with this color
    await prisma.point.deleteMany({
        where: {
            group: {
                colorId: id
            }
        }
    });

    // Update associated caches
    revalidateTag("points");

    // Delete any groups associated with this color
    await prisma.group.deleteMany({
        where: {
            colorId: id
        }
    });

    // Update associated caches
    revalidateTag("groups");

    await prisma.color.delete({
        where: {
            id: id
        }
    });

    // Revalidate the colors tag
    revalidateTag("colors");
}