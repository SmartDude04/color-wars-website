import Link from "next/link";
import { auth } from "@/auth";

export default async function DesktopNavbarLinks() {
    const session = await auth();

    const role = session?.user?.role ?? "none";

    const linkStyles = "text-2xl ml-2 mr-2 hover:-translate-y-[2px] duration-150";
    return (
        <div className="flex flex-row items-center ml-8">
            <Link href="/" className={linkStyles}>Home</Link>
            <Link href="/about" className={linkStyles}>About</Link>
            { role === "admin" || role === "specialist" || role === "user" ? (
                <Link href="/history" className={linkStyles}>History</Link>
            ) : <></> }
            { role === "admin" ? (
                <>
                    <Link href="/groups" className={linkStyles}>Groups</Link>
                    <Link href="/colors" className={linkStyles}>Colors</Link>
                </>
            ) : <></> }
            { role === "admin" || role === "specialist" ? (
                <>
                    <Link href="/users" className={linkStyles}>Users</Link>
                    <Link href="/add-points" className="text-2xl ml-2 mr-2 bg-yellow-400 dark:bg-yellow-800 hover:bg-yellow-500 dark:hover:bg-yellow-900 rounded-4xl pt-2 pb-2 pl-5 pr-5 duration-200">Add Points</Link>
                </>
            ) : <></> }
        </div>
    )
}