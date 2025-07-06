import { prisma } from "@/prisma";
import PointsDisplay from "@/components/PointsDisplay";
import styles from "@/app/page.module.css";
import React from "react";

interface Props {
    teamName: string
    teamId: number
    teamHexColor: string
}

export default async function TeamPointsCard({ teamName, teamId, teamHexColor }: Props) {
    const groups = await prisma.group.findMany({
        where: {
            teamId: teamId
        },
        orderBy: {
            name: "asc"
        }
    });

    // Verify hex color string is 6 chars long
    const regex = /^#?([A-F0-9]{6}|[A-F0-9]{3})$/;
    if (!regex.test(teamHexColor)) {
        throw new Error(`Invalid team hex color "${teamHexColor}"passed to TeamPointsCard.`);
    }


    // Convert hex to RGB to add an opacity and make the color less harsh
    const rawRGB = /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.exec(teamHexColor);
    const rgb = {
        r: parseInt(rawRGB![1], 16),
        g: parseInt(rawRGB![2], 16),
        b: parseInt(rawRGB![3], 16)
    };
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
    const darkRgba = `rgba(${rgb.r * 0.7}, ${rgb.g * 0.7}, ${rgb.b * 0.7}, 0.7)`;

    return (
        <div className="flex flex-col shadow-xl rounded-xl text-black">
            <div className={`w-full flex flex-col pt-3 pb-3 rounded-t-xl ${styles.teamColorBg}`} style={{
                "--dark-color": darkRgba,
                "--light-color": rgba,
            } as React.CSSProperties}>
                <h1 className="w-full text-center text-6xl sm:text-7xl">{teamName.toUpperCase()}</h1>
                <h2 className="w-full text-center text-xl sm:text-2xl">{groups.map(group => group.name).toString().replace(",", ", ")}</h2>
            </div>
            <div className="w-full flex flex-col pt-5 pb-5 backdrop-blur-xl rounded-b-xl bg-[rgba(255,255,255,0.15)]">
                <PointsDisplay teamId={teamId} />
            </div>
        </div>
    );
}
