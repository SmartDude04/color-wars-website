import "../(default)/globals.css";
import React from "react";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import LoginNavbar from "@/components/Navbar/LoginNavbar";

const cachetStdBold = localFont({
    src: "../cachet-std-bold.otf"
});

export const metadata: Metadata = {
    title: "CGC Color Wars",
    description: "Website for Color Wars at Camp Gordon Clark"
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={cachetStdBold.className} suppressHydrationWarning>
        <body className="antialiased w-screen h-dvh">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
        >
            <SessionProvider>
                <LoginNavbar />
                {children}
            </SessionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}
