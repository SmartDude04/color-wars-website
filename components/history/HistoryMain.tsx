"use client"

import { useState } from "react";
import { deletePointEntry, getPoints } from "@/app/history/actions";
import HistoryRow from "@/components/history/HistoryRow";

interface Point {
    id: string
    group: {
        name: string
        color: {
            name: string
        }
    }
    activity: {
        name: string
    }
    amount: number
    timestamp: Date,
    description: string | null
}

interface Props {
    initialPoints: Point[],
    canDelete: boolean
}

export default function HistoryMain({ initialPoints, canDelete }: Props) {
    const [points, setPoints] = useState(initialPoints);

    const fetchPoints = async () => {
        const points = await getPoints();
        setPoints(points);
    }

    const handleDeletePoint = async (pointId: string) => {
        if (!canDelete) return;
        setPoints(points.filter(point => point.id !== pointId));
        await deletePointEntry(pointId);
        await fetchPoints();
    }

    const headerStyles = "text-2xl";
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[95%] lg:w-[80%] mt-6 border-1 border-gray-300 dark:border-[#333333] bg-white dark:bg-[#151515] rounded-xl duration-200 text-lg flex flex-col">
                <div className="rounded-t-xl bg-blue-100 dark:bg-[#131522] w-full flex flex-row items-center p-2 pt-2">
                    <h1 className={`${headerStyles} hidden md:block w-[17%]`}>Date/Time</h1>
                    <h1 className={`${headerStyles} w-[30%] md:w-[13%]`}>Amount</h1>
                    <h1 className={`${headerStyles} w-[30%] md:w-[10%]`}>Color</h1>
                    <h1 className={`${headerStyles} hidden md:block w-[10%]`}>Group</h1>
                    <h1 className={`${headerStyles} w-[35%] md:w-[15%]`}>Activity</h1>
                    <h1 className={`${headerStyles} hidden md:block w-[35%]`}>Description</h1>
                </div>
                { points.map((point, index) => (
                    <HistoryRow key={point.id} point={point} canDelete={canDelete} onDelete={handleDeletePoint} oddRow={index % 2 === 1} lastRow={index === points.length - 1}/>
                ))}
            </div>
            <h2 className="w-[95%] lg:w-[80%] mt-2 text-center text-sm">The latest 25 entries are viewable. To view more entries, contact Aidan.</h2>
        </div>
    );
}