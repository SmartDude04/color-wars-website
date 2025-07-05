import "./globals.css";
import React from "react";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
    title: "CGC Color Wars",
    description: "Website for Color Wars at Camp Gordon Clark"
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider>{children}</ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
