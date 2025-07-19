"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

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
    timestamp: Date | string,
    description: string | null
}

interface Props {
    point: Point,
    canDelete: boolean,
    onDelete(pointId: string): void,
    oddRow: boolean,
    lastRow: boolean
}


export default function HistoryRow({ point, canDelete, onDelete, oddRow, lastRow }: Props) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    // Convert the timestamp to a date object in case it gets converted to a string somewhere
    const timestamp = point.timestamp instanceof Date ? point.timestamp : new Date(point.timestamp);

    let hours = timestamp.getHours();
    let amPm = "AM";
    if (hours > 12) {
        hours -= 12;
        amPm = "PM";
    }
    let minutes = timestamp.getMinutes().toString();
    if (minutes.length === 1) minutes = `0${minutes}`;
    const dateTime = `${timestamp.getMonth()}/${timestamp.getDate()} ${hours}:${minutes} ${amPm}`;

    if (confirmDelete) {
        return (
            <div className={`${oddRow ? "bg-gray-200 dark:bg-[#202020]" : ""} w-full flex flex-row items-center justify-center p-2 pt-4 pb-2 lg:pt-2 ${lastRow ? "rounded-bl-xl" : ""} ${lastRow ? "rounded-br-xl" : ""}`}>
                <button onClick={() => setConfirmDelete(false)} className="bg-gray-500 text-white text-xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer m-1">Cancel</button>
                <button onClick={() => onDelete(point.id)} className="bg-red-700 text-white text-xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-red-800 duration-200 cursor-pointer m-1">Confirm Delete</button>
            </div>
        );
    }

    return (
        <div className={`${oddRow ? "bg-gray-200 dark:bg-[#202020]" : ""} w-full flex flex-row items-center p-2 pt-6 pb-4 lg:pt-4 ${lastRow ? "rounded-bl-xl" : ""} ${lastRow ? "rounded-br-xl" : ""}`}>
            <h1 className="hidden md:block w-[17%]">{dateTime}</h1>
            <h1 className="w-[30%] md:w-[13%]">{point.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            <h1 className="w-[30%] md:w-[10%]">{point.group.color.name}</h1>
            <h1 className="hidden md:block w-[10%]">{point.group.name}</h1>
            <h1 className="w-[35%] md:w-[15%]">{point.activity.name}</h1>
            <p className={`hidden md:block ${canDelete ? "w-[30%]" : "w-[35%]"}`}>{point.description}</p>
            { canDelete && (
                <button onClick={() => setConfirmDelete(true)} className="w-[5%] flex justify-center pb-2 lg:pb-0 cursor-pointer"><Trash2 width={24} height={24}/></button>
            ) }
        </div>
    );
}
