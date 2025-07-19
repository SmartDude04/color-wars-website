"use server";

import { prisma } from "@/prisma";
import { unstable_cache } from "next/cache";

const getPointsCached = unstable_cache(
    async (colorId: string) => {
        return prisma.point.aggregate({
            _sum: {
                amount: true
            },
            where: {
                group: {
                    colorId: colorId
                }
            }
        });
    },
    [],
    {
        tags: ["points"],
        revalidate: false
    }
);

export async function getColorPoints(colorId: string) {
    const points = await getPointsCached(colorId);

    // If no points have been added for this user, set their points to 0
    if (!points._sum.amount) {
        points._sum.amount = 0;
    }

    return points._sum.amount;
}