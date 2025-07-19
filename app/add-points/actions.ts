"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";

export async function addPoints(amount: number, groupId: string, activityName: string, description?: string) {
    const session = await auth();
    if (session?.user.role !== "admin") {
        return;
    }

    // Make sure group is valid
    const validGroup = await prisma.group.count({
        where: {
            id: groupId
        }
    }) === 1;

    if (!validGroup) {
        return;
    }

    // Make sure activity is valid
    const validActivity = await prisma.activity.count({
        where: {
            name: activityName
        }
    }) === 1;

    if (!validActivity) {
        return;
    }

    await prisma.point.create({
        data: {
            amount: amount,
            description: description,
            userId: session.user.id,
            groupId: groupId,
            activityName: activityName,
        }
    });

    // Update the tag
    revalidateTag("points");
}
