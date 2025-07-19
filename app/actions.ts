"use server";

import { getPointsForColorCached } from "@/app/cached";

export async function getColorPoints(colorId: string) {
    const points = await getPointsForColorCached(colorId);

    // If no points have been added for this user, set their points to 0
    if (!points._sum.amount) {
        points._sum.amount = 0;
    }

    return points._sum.amount;
}