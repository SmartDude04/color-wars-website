import { auth } from "@/auth";
import Link from "next/link";
import { handleSignOut } from "@/components/Navbar/actions";

export default async function DesktopNavbarAuth() {
    const session = await auth();

    // If the user is not logged in, show sign-in and sign up buttons
    const styles = "text-xl pt-2 pb-2 ml-1 mr-1 pl-5 pr-5 rounded-3xl bg-blue-200 dark:bg-cyan-950 hover:bg-blue-300 duration-100 dark:hover:bg-cyan-900";
    if (!session?.user) {
        return (
            <div className="flex flex-row">
                <Link href="/login" className={styles}>Log In</Link>
                <Link href="/signup" className={styles}>Sign Up</Link>
            </div>
        );
    }

    // If the user is logged in, show the sign-out and account buttons
    return (
        <div className="flex flex-row items-center justify-center">
            <h1 className="text-2xl mr-4">{session.user.username}</h1>
            <form action={handleSignOut}>
                <button className={`${styles} cursor-pointer`}>Sign Out</button>
            </form>
        </div>
    );
}