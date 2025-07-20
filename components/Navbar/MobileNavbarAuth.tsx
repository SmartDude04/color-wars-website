"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { handleSignOut } from "@/components/Navbar/actions";

interface Props {
    closeLinks(): void
}

export default function MobileNavbarAuth({ closeLinks }: Props) {
    const { data: session } = useSession();

    // If the user is not logged in, show sign-in and sign up buttons
    const styles = "text-4xl mt-2 mb-2 pt-2 pb-2 pl-5 pr-5 rounded-4xl bg-blue-200 dark:bg-cyan-900 active:dark:bg-cyan-950 active:bg-blue-300 duration-100";
    if (!session?.user) {
        return (
            <div className="w-fit flex flex-col justify-start text-center">
                <Link href="/login" className={`${styles} mr-1`} onNavigate={closeLinks}>Log In</Link>
                <Link href="/signup" className={`${styles} ml-1`} onNavigate={closeLinks}>Sign Up</Link>
            </div>
        );
    }

    // If the user is logged in, show the sign-out and account buttons
    return (
        <div className="flex flex-col w-fit mt-4">
            <h1 className="text-4xl mr-4">{session.user.username}</h1>
            <form action={handleSignOut}>
                <button className={styles}>Sign Out</button>
            </form>
        </div>
    );
}