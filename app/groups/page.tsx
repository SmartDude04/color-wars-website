import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getColors } from "@/app/colors/actions";
import GroupsMain from "@/components/groups/GroupsMain";
import { getGroups } from "@/app/groups/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Groups - Color Wars"
}

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session?.user.role === "admin") {
        const colors = await getColors();
        const groups = await getGroups();
        return <GroupsMain initialGroups={groups} initialColors={colors}/>
    }

    redirect("/");
}