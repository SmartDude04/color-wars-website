import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Props {
    id: string,
    name: string,
    hexColor: string,
    updateColor(id: string, name: string, hexColor: string): void,
    deleteColor(id: string): void
}

const confirmHexFormat = (hexColor: string) => {
    const regex = /^#([A-F0-9]{6}|[A-F0-9]{3})$/;
    return hexColor.length === 7 && regex.test(hexColor);
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

export default function ColorCard({ id, name, hexColor, updateColor, deleteColor }: Props) {
    const { theme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [nameInput, setNameInput] = useState(name);
    const [hexColorInput, setHexColorInput] = useState(hexColor);
    const [validHex, setValidHex] = useState<boolean>(confirmHexFormat(hexColor));
    const [rgb, setRgb] = useState<{rgba: string, darkRgba: string}>(getRGB(hexColor));

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setValidHex(confirmHexFormat(hexColorInput));
    }, [hexColorInput]);

    useEffect(() => {
        if (confirmHexFormat(hexColorInput)) {
            setRgb(getRGB(hexColorInput));
        }
    }, [validHex, hexColorInput]);


    if (confirmDelete) {
        return (
            <div className="h-[260px] rounded-md flex flex-col bg-gray-300 dark:bg-gray-800 items-center justify-center">
                <h1 className="text-5xl text-center">Are you sure?</h1>
                <h2 className="text-center m-4 mt-2">This will also delete any groups and points associated with this team</h2>
                <div className="flex flex-row">
                    <button onClick={() => setConfirmDelete(false)} className="bg-gray-500 text-white text-2xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer mr-1">Cancel</button>
                    <button onClick={() => deleteColor(id)} className="bg-red-700 text-white text-2xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-red-800 duration-200 cursor-pointer ml-1">Confirm</button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[260px] rounded-xl flex flex-col items-center pt-6" style={{
            backgroundColor: isMounted ? (theme === "dark" ? rgb.darkRgba : rgb.rgba) : rgb.rgba
        }}>
            <input type="text" onChange={(event) => setNameInput(event.target.value)} value={nameInput} className="w-[250px] outline-none border-b-2 text-center text-6xl duration-200" />
            <input type="text" onChange={(event) => setHexColorInput(event.target.value.toUpperCase())} value={hexColorInput} className={`mt-4 w-[100px] outline-none border-b-2 text-center text-xl duration-200 ${!validHex ? "border-red-500" : "border-black dark:border-white"}`} />
            <div className="flex flex-row mt-6">
                <button onClick={() => updateColor(id, nameInput, hexColorInput)} className="disabled:bg-gray-500 bg-green-600 dark:bg-green-800 text-white text-2xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl not-disabled:hover:bg-green-700 not-disabled:dark:hover:bg-green-900 duration-200 cursor-pointer disabled:cursor-not-allowed ml-1" disabled={!validHex || nameInput.length === 0}>Save</button>
                <button onClick={() => setConfirmDelete(true)} className="bg-red-700 dark:bg-red-900 text-white text-2xl pt-2 lg:pt-1 pb-1 pl-6 pr-6 rounded-4xl hover:bg-red-800 dark:hover:bg-red-950 duration-200 cursor-pointer ml-1">Delete</button>
            </div>
        </div>
    );
}