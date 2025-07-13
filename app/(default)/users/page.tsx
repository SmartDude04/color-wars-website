import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UsersMain from "@/components/users/UsersMain";

export default async function Page() {
    // Prevent unauthenticated access to this page
    const session = await auth();
    if (session?.user.role === "admin" || session?.user.role === "specialist") {
        return <UsersMain role={session.user.role} />
    }

    redirect("/");
}