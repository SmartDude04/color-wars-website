"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="p-2 bg-gray-300 dark:bg-gray-700 rounded-3xl flex align-center justify-center">
            { !isMounted ? (
                <div className="w-6 h-6"></div>
            ) : (
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="duration-200 cursor-pointer">
                    { theme === "dark" ? (
                        <Sun width={24} height={24} color="white" fill="white"/>
                    ) : (
                        <Moon width={24} height={24} color="black" fill="black"/>
                    )}
                </button>
            )}
        </div>
    );
}