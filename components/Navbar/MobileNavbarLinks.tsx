"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MobileNavbarAuth from "@/components/Navbar/MobileNavbarAuth";

export default function MobileNavbarLinks() {
    const [opened, setOpened] = useState(false);

    const { data: session } = useSession();

    const role = session?.user?.role ?? "none";

    const linkStyles = "text-4xl mt-2 mb-2 duration-150";

    return (
        <>
            <button onClick={() => setOpened(!opened)}>
                { opened ? (
                    <X width={32} height={32}/>
                ) : (
                    <Menu width={32} height={32}/>
                )}
            </button>
            <div className={`flex flex-col justify-start items-start fixed top-18 right-0 bottom-0 w-full p-6 bg-gray-100 dark:bg-gray-800 duration-200 ${opened ? "" : "translate-x-full opacity-0"}`}>
                { role === "admin" || role === "specialist" ? (
                    <div className="w-full flex justify-between items-center">
                        <Link href="/add-points" className="text-4xl mt-2 mb-2 pt-3 bg-yellow-400 dark:bg-yellow-800 rounded-4xl pl-5 pr-5 duration-200 flex items-center justify-center" onNavigate={() => setOpened(false)}>Add Points</Link>
                        <div className="flex items-center justify-center p-2 rounded-4xl bg-gray-300 dark:bg-gray-700">
                            <ThemeSwitcher />
                        </div>
                    </div>
                ) : (
                    <div className="fixed right-6 w-full flex justify-end items-center pointer-events-none">
                        <div className="flex items-center justify-center p-2 rounded-4xl bg-gray-300 dark:bg-gray-700 pointer-events-auto">
                            <ThemeSwitcher />
                        </div>
                    </div>
                ) }
                <Link href="/" className={linkStyles} onNavigate={() => setOpened(false)}>Home</Link>
                <Link href="/about" className={linkStyles} onNavigate={() => setOpened(false)}>About</Link>
                { role === "admin" || role === "specialist" || role === "user" ? (
                    <Link href="/history" className={linkStyles} onNavigate={() => setOpened(false)}>History</Link>
                ) : <></>}
                { role === "admin" ? (
                    <>
                        <Link href="/groups" className={linkStyles} onNavigate={() => setOpened(false)}>Groups</Link>
                        <Link href="/teams" className={linkStyles} onNavigate={() => setOpened(false)}>Teams</Link>
                        <Link href="/users" className={linkStyles} onNavigate={() => setOpened(false)}>Users</Link>
                    </>
                ) : <></>}
                <div className="mt-5 w-full">
                    <MobileNavbarAuth />
                </div>
            </div>
        </>
    );
}
