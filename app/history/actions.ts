"use server";

import { prisma } from "@/prisma";
import { getPointsCached } from "@/cached";
import { auth } from "@/auth";
import { updateTag } from "next/cache";

export async function getPoints() {
    const session = await auth();
    if (!session) {
        return [];
    }
    return getPointsCached();
}

export async function deletePointEntry(id: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    await prisma.point.delete({
        where: {
            id: id
        }
    });

    updateTag("points");
}