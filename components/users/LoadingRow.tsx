"use client";

import Image from "next/image";
import loadingSVG from "@/public/loading.svg";
import darkLoadingSVG from "@/public/loading-white.svg";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LoadingRow({ colSpan }: { colSpan: number }) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <tr>
            <td colSpan={colSpan} className="rounded-b-xl">
                <div className="w-full flex items-center justify-center p-4">
                    <Image src={mounted ? (theme === "dark" ? darkLoadingSVG : loadingSVG) : loadingSVG} alt="Loading..." width={32} height={32}/>
                </div>
            </td>
        </tr>
    )
}