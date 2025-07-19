import { prisma } from "@/prisma";
import PointsDisplay from "@/components/PointsCard/PointsDisplay";
import "@/app/(default)/page.css";
import React from "react";
import { unstable_cache } from "next/cache";

interface Props {
    colorName: string
    colorId: string
    hexColor: string
}

const getGroups = unstable_cache(
    async (colorId: string) => {
        return prisma.group.findMany({
            where: {
                colorId: colorId
            },
            orderBy: {
                name: "asc"
            }
        });
    },
    [],
    {
        tags: ["groups"],
        revalidate: false
    }
);

export default async function ColorPointsCard({ colorName, colorId, hexColor }: Props) {
    const groups = await getGroups(colorId);

    // Verify hex color string
    const regex = /^#?([A-F0-9]{6}|[A-F0-9]{3})$/;
    if (!regex.test(hexColor)) {
        throw new Error(`Invalid hex color "${hexColor}"passed to TeamPointsCard.`);
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
                <h1 className="w-full text-center text-6xl sm:text-7xl pt-4 lg:pt-0">{colorName.toUpperCase()}</h1>
                <h2 className="w-full text-center text-xl sm:text-2xl">{groups.map(group => group.name).toString().replace(",", ", ")}</h2>
            </div>
            <div className="w-full flex flex-col pt-5 pb-5 rounded-b-xl bg-[rgba(255,255,255,0.25)]">
                <PointsDisplay teamId={colorId} />
            </div>
        </div>
    );
}
