"use client";

import { useState } from "react";
import { addPoints } from "@/app/add-points/actions";
import Image from "next/image";
import loadingSVG from "@/public/loading.svg";
import loadingSVGDark from "@/public/loading-white.svg"
import { useTheme } from "next-themes";
import { redirect } from "next/navigation";

interface Group {
    id: string,
    name: string,
    colorId: string
}

interface Color {
    id: string,
    name: string,
    hexColor: string
}

interface Props {
    colors: Color[],
    groups: Group[],
    activities: { name: string }[]
}

export default function AddPointsForm({ colors, groups, activities }: Props) {
    const [amount, setAmount] = useState<number>(0);
    const [color, setColor] = useState<Color>({ id: "", name: "", hexColor: ""});
    const [group, setGroup] = useState<Group>({ id: "", name: "", colorId: ""});
    const [activity, setActivity] = useState<{ name: string }>({ name: "" });
    const [description, setDescription] = useState<string>("");
    const [isPending, setIsPending] = useState(false);
    const { theme } = useTheme();

    const handleAddPoints = async () => {
        setIsPending(true);
        await addPoints(amount, group.id, activity.name, description);
        redirect("/");
    }

    const selectStyles = "mt-2 mb-2 disabled:text-gray-500 bg-gray-50 border border-gray-300 text-gray-900 text-lg text-center rounded-4xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#222222] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[90%]";
    const inputStyles = "w-[90%] dark:border-gray-500 border-2 border-white dark:border-black duration-200 pt-2 pb-2 mt-2 mb-2";
    return (
        <>
            <input type="number" value={amount ? amount : ""} onChange={event => setAmount(event.target.valueAsNumber)} placeholder="Amount" className={`${inputStyles} rounded-4xl text-2xl text-center pl-4 pr-4`} />
            <select value={color.id} onChange={event => setColor(colors.find(color => color.id === event.target.value)!)} className={selectStyles}>
                { color.id === "" ? <option value="">Color</option> : "" }
                { colors.map(color => (
                    <option key={color.id} value={color.id}>{color.name}</option>
                ))}
            </select>
            <select value={group.id} onChange={event => setGroup(groups.find(group => group.id === event.target.value)!)} className={selectStyles} disabled={color.id === ""}>
                { group.id === "" || group.colorId !== color.id ? <option value="">Group</option> : "" }
                { groups.map(group => {
                    if (group.colorId === color.id) {
                        return (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        )
                    }
                })}
            </select>
            <select value={activity.name} onChange={event => setActivity({ name: event.target.value })} className={selectStyles}>
                { activity.name === "" ? <option value="">Activity</option> : "" }
                { activities.map(activity => (
                    <option key={activity.name} value={activity.name}>{activity.name}</option>
                ))}
            </select>
            <textarea rows={2} value={description} onChange={event => setDescription(event.target.value)} placeholder="Description (optional)" className={`${inputStyles} resize-none rounded-lg placeholder:text-center pl-2 pr-2`} />
            <button onClick={handleAddPoints} disabled={amount === 0 || group.id === "" || group.colorId !== color.id || activity.name === ""} className="disabled:text-gray-500 mt-12 w-[90%] md:w-[80%] bg-white dark:bg-[#2e2e2e] text-3xl pt-4 pb-2 md:pt-4 md:pb-4 rounded-4xl disabled:cursor-not-allowed cursor-pointer not-disabled:hover:bg-gray-200 dark:not-disabled:hover:bg-[#404040] duration-200 flex items-center justify-center">
                { isPending ? (
                    <Image alt="Loading..." src={theme === "dark" ? loadingSVGDark : loadingSVG} width={36} height={36} />
                ) : "Add Points"}
            </button>
        </>
    )
}