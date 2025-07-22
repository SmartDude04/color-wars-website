"use client";

import "@/app/page.css";
import React, { useEffect, useState } from "react";
import ColorPointsCard from "@/components/PointsCard/ColorPointsCard";
import { getColorsHome } from "@/app/actions";

interface Color {
    id: string
    name: string
    hexColor: string
    amount: number
    groups: {
        name: string
    }[]
}

interface Props {
    initialColors: Color[],
    isBlurred: boolean
}

export default function ColorsHomeMain({ initialColors, isBlurred }: Props) {
    const [colors, setColors] = useState(initialColors);

    useEffect(() => {
        const interval = setInterval(async () => {
            const colors = await getColorsHome();
            setColors(colors);
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 p-4 sm:p-6">
            { colors.map(color => (
                <ColorPointsCard key={color.id} name={color.name} hexColor={color.hexColor} amount={color.amount} groups={color.groups} blurred={isBlurred} />
            ))}
        </div>
    );
}