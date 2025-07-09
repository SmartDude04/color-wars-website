"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import colorWarsLogo from "@/public/color-wars-main.png";
import colorWarsLogoDark from "@/public/color-wars-main-dark.png";
import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link href="/">
            { !isMounted ? (
                <Image src={colorWarsLogo} width={198} height={57} alt="Color Wars Logo"/>
            ) : (theme === "light" ? (
                <Image src={colorWarsLogo} width={198} height={57} alt="Color Wars Logo"/>
            ) : (
                <Image src={colorWarsLogoDark} width={198} height={57} alt="Color Wars Logo"/>
            )) }
        </Link>
    );
}