import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ColorsMain from "@/components/colors/ColorsMain";
import { getColors } from "@/app/colors/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Colors - Color Wars"
}

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session?.user.role === "admin") {
        const colors = await getColors();
        return <ColorsMain initialState={colors}/>
    }

    redirect("/");
}