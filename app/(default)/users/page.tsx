import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UsersMain from "@/components/users/UsersMain";
import { getUsersData } from "@/app/(default)/users/actions";

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session?.user.role === "admin" || session?.user.role === "specialist") {
        const users = await getUsersData();
        return <UsersMain role={session.user.role} initialState={users} curUserId={session.user.id}/>
    }

    redirect("/");
}