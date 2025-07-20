import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type ColorDataType = {
    id: string,
    name: string,
    hexColor: string
}[];

type Color = {
    id: string,
    name: string,
    hexColor: string
};

interface Props {
    addGroup(name: string, colorId: string): void,
    cancelAddGroup(): void
    colors: ColorDataType
}

const getRGB = (hexColor: string) => {
    // Convert hex to RGB to add an opacity and make the color less harsh
    const rawRGB = /^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.exec(hexColor);
    const rgb = {
        r: parseInt(rawRGB![1], 16),
        g: parseInt(rawRGB![2], 16),
        b: parseInt(rawRGB![3], 16)
    };
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
    const darkRgba = `rgba(${rgb.r * 0.7}, ${rgb.g * 0.7}, ${rgb.b * 0.7}, 0.7)`;

    return { rgba, darkRgba };
}

export default function NewGroupCard({ addGroup, cancelAddGroup, colors }: Props) {
    const { theme } = useTheme();
    const [nameInput, setNameInput] = useState("");
    const [colorIdInput, setColorIdInput] = useState("");
    const [curColor, setCurColor] = useState<Color | null>(null);

    useEffect(() => {
        setCurColor(colors.find(color => color.id === colorIdInput)!);
    }, [colorIdInput, colors]);
    
    return (
        <div className="h-[260px] rounded-xl flex flex-col items-center pt-6" style={{
            backgroundColor: colorIdInput === "" ? "#333333" : (theme === "dark" ? getRGB(colors.find(color => color.id === colorIdInput)!.hexColor).darkRgba : getRGB(colors.find(color => color.id === colorIdInput)!.hexColor).rgba),
        }}>
            <input type="text" onChange={(event) => setNameInput(event.target.value)} value={nameInput} className="w-[min(300px,95%)] outline-none border-b-2 text-center text-6xl duration-200 mb-4" />
            <select value={curColor?.id} onChange={(event) => setColorIdInput(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-lg text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#222222] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[min(200px,95%)]">
                { colorIdInput === "" ? <option value=""></option> : "" }
                { colors.map(color => (
                    <option key={color.id} value={color.id}>{color.name}</option>
                ))}
            </select>
            <div className="flex flex-row mt-6">
                <button onClick={cancelAddGroup} className="bg-gray-500 text-white text-2xl pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer mr-1">Cancel</button>
                <button onClick={() => addGroup(nameInput, colorIdInput)} className="disabled:bg-gray-500 bg-green-600 dark:bg-green-800 text-white text-2xl pt-1 pb-1 pl-6 pr-6 rounded-4xl not-disabled:hover:bg-green-700 not-disabled:dark:hover:bg-green-900 duration-200 cursor-pointer disabled:cursor-not-allowed ml-1" disabled={colorIdInput === "" || nameInput.length === 0}>Add</button>
            </div>
        </div>
    );
}