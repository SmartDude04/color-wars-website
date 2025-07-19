import { auth } from "@/auth";
import { getPointsCached } from "@/cached";
import { redirect } from "next/navigation";
import HistoryMain from "@/components/history/HistoryMain";

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session) {
        const points = await getPointsCached();
        return <HistoryMain initialPoints={points} canDelete={session.user.role === "admin"}/>
    }

    redirect("/");
}