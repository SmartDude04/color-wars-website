"use client";

import { useState } from "react";
import { getColors, addColor, updateColor, deleteColor } from "@/app/colors/actions";
import ColorCard from "@/components/colors/ColorCard";
import { Plus } from "lucide-react";
import NewColorCard from "@/components/colors/NewColorCard";

type ColorDataType = {
    id: string,
    name: string,
    hexColor: string
}[];

interface Props {
    initialState: ColorDataType
}

export default function ColorsMain({ initialState } : Props) {
    const [colors, setColors] = useState<ColorDataType>(initialState);
    const [addColorModal, setAddColorModal] = useState(false);

    const fetchColors = async () => {
        const fetchedColors = await getColors();

        setColors(fetchedColors);
    }

    const addColorHandler = async (name: string, hexColor: string) => {
        // Optimistically update the UI
        setAddColorModal(false);
        setColors([ ...colors, { id: "", name, hexColor } ].sort((a, b) => a.name.localeCompare(b.name)));

        await addColor(name, hexColor);
        await fetchColors();
    }

    const updateColorHandler = async (id: string, name: string, hexColor: string) => {
        await updateColor(id, name, hexColor);
        await fetchColors();
    }

    const deleteColorHandler = async (id: string) => {
        // Optimistically update the UI
        setColors(colors.filter(color => color.id !== id));

        await deleteColor(id);
        await fetchColors();
    }

    return (
        <>
            <div className="w-full pl-4 pt-6 sm:pl-6">
                <button onClick={() => setAddColorModal(true)} className="flex flex-row items-center bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 pt-1 pb-1 pl-4 pr-4 rounded-4xl duration-200 cursor-pointer">
                    <Plus width={48} height={48} strokeWidth={3}/>
                    <h1 className="text-4xl">Add Color</h1>
                </button>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 p-4 sm:p-6">
                { addColorModal ? (
                    <NewColorCard addColor={addColorHandler} cancelAddColor={() => setAddColorModal(false)} />
                ) : <></> }
                { colors.map(color => (
                    <ColorCard key={color.id} id={color.id} name={color.name} hexColor={color.hexColor} updateColor={updateColorHandler} deleteColor={deleteColorHandler} />
                ))}
            </div>
        </>
    );
}