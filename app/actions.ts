"use server";

import { getColorsWithGroupsAndPointsCached } from "@/cached";

export async function getColorsHome() {
    return getColorsWithGroupsAndPointsCached();
}