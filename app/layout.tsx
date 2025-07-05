import "./globals.css";
import React from "react";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";

const cachetStdBold = localFont({
    src: "./cachet-std-bold.otf"
});

export const metadata: Metadata = {
    title: "CGC Color Wars",
    description: "Website for Color Wars at Camp Gordon Clark"
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={cachetStdBold.className} suppressHydrationWarning>
            <body className="antialiased">
                <Navbar />
                <ThemeProvider>{children}</ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
