"use client";

import { useState, useEffect } from "react";
import { getTeamPoints } from "@/app/actions";
import PointsCardDisplayLoading from "@/components/PointsCardDisplayLoading";

interface Props {
    teamId: number
}

export default function PointsCardDisplay({ teamId }: Props) {
    const [points, setPoints] = useState<number | null>(null);

    useEffect(() => {
        const fetchPoints = async () => {
            const points = await getTeamPoints(teamId);
            setPoints(points);
        }

        fetchPoints().then();
    }, [teamId]);

    return (
        points !== null ? (
            <h1 className="w-full text-center sm:text-8xl text-7xl">{points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
        ) : (
            <PointsCardDisplayLoading />
        )
    );
}