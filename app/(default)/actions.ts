"use server";

import { prisma } from "@/prisma";

export async function getTeamPoints(teamId: string) {
    const points = await prisma.point.aggregate({
        _sum: {
            amount: true
        },
        where: {
            group: {
                teamId: teamId
            }
        }
    });

    // If no points have been added for this user, set their points to 0
    if (!points._sum.amount) {
        points._sum.amount = 0;
    }

    return points._sum.amount;
}