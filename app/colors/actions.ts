"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { updateTag } from "next/cache";
import { getColorsCached } from "@/cached";

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
    updateTag("colors");
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
    updateTag("colors");
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
    updateTag("points");

    // Delete any groups associated with this color
    await prisma.group.deleteMany({
        where: {
            colorId: id
        }
    });

    // Update associated caches
    updateTag("groups");

    await prisma.color.delete({
        where: {
            id: id
        }
    });

    // Revalidate the colors tag
    updateTag("colors");
}

export async function setBlur(isBlurred: boolean) {
    if (isBlurred) {
        await prisma.blur.create({
            data: {
                blurred: true
            }
        });
    } else {
        await prisma.blur.deleteMany();
    }
    updateTag("blur");
}