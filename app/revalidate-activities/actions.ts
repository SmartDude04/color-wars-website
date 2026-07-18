"use server";

import { updateTag } from "next/cache";

export async function revalidateActivities() {
    updateTag("activities");
}