"use client";

import "@/app/page.css";
import React, { useEffect, useState } from "react";

interface Props {
    name: string
    hexColor: string
    amount: number
    groups: {
        name: string
    }[],
    blurred: boolean
}

export default function ColorPointsCard({ name, hexColor, amount, groups, blurred }: Props) {
    const [rand, setRand] = useState(0);

    useEffect(() => {
        if (blurred) {
            const interval = setInterval(() => {
                setRand(Math.floor(Math.random() * 900000) + 100000);
            }, 50);
    
            return () => clearInterval(interval);
        }
    }, [blurred]);

    // Verify hex color string
    const regex = /^#?([A-F0-9]{6}|[A-F0-9]{3})$/;
    if (!regex.test(hexColor)) {
        throw new Error(`Invalid hex color "${hexColor}" passed to TeamPointsCard.`);
    }

    // Convert hex to RGB to add an opacity and make the color less harsh
    const rawRGB = /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.exec(hexColor);
    const rgb = {
        r: parseInt(rawRGB![1], 16),
        g: parseInt(rawRGB![2], 16),
        b: parseInt(rawRGB![3], 16)
    };
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
    const darkRgba = `rgba(${rgb.r * 0.7}, ${rgb.g * 0.7}, ${rgb.b * 0.7}, 0.7)`;

    return (
        <div className="flex flex-col shadow-md rounded-xl text-black">
            <div className="w-full flex flex-col pt-3 pb-3 rounded-t-xl teamColorBg duration-200 h-full" style={{
                "--dark-color": darkRgba,
                "--light-color": rgba,
            } as React.CSSProperties}>
                <h1 className="w-full text-center text-6xl sm:text-7xl">{name.toUpperCase()}</h1>
                <h2 className="w-full text-center text-xl sm:text-2xl pl-4 pr-4">{groups.map(group => group.name).toString().replaceAll(",", ", ")}</h2>
            </div>
            <div className="items-center justify-center w-full flex flex-col pt-6 pb-6 rounded-b-xl backdrop-blur-xl z-0 bg-[rgba(255,255,255,0.25)]">
                <h1 className={`text-center text-7xl z-0 max-w-[95%] ${blurred && "blur-[20px] cursor-default"}`}>{
                    blurred ? rand : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }</h1>
            </div>
        </div>
    );
}
