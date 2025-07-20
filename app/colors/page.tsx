import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ColorsMain from "@/components/colors/ColorsMain";
import { getColors } from "@/app/colors/actions";
import { Metadata } from "next";
import { getIsBlurredCached } from "@/cached";

export const metadata: Metadata = {
    title: "Colors - Color Wars"
}

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session?.user.role === "admin") {
        const colors = await getColors();
        const isBlurred = await getIsBlurredCached();
        return <ColorsMain initialState={colors} isBlurred={isBlurred}/>
    }

    redirect("/");
}