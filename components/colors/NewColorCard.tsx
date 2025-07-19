import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface Props {
    addColor(name: string, hexColor: string): void,
    cancelAddColor(): void
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

export default function NewColorCard({ addColor, cancelAddColor }: Props) {
    const { theme } = useTheme();
    const [nameInput, setNameInput] = useState("");
    const [hexColorInput, setHexColorInput] = useState("#");
    const [validHex, setValidHex] = useState<boolean>(confirmHexFormat(hexColorInput));
    const [rgb, setRgb] = useState<{rgba: string, darkRgba: string}>(getRGB("#333333"));

    useEffect(() => {
        setValidHex(confirmHexFormat(hexColorInput));
    }, [hexColorInput]);

    useEffect(() => {
        if (confirmHexFormat(hexColorInput)) {
            setRgb(getRGB(hexColorInput));
        }
    }, [validHex, hexColorInput]);

    return (
        <div className="h-[260px] rounded-xl flex flex-col items-center pt-6" style={{
            backgroundColor: theme === "dark" ? rgb.darkRgba : rgb.rgba
        }}>
            <input type="text" onChange={(event) => setNameInput(event.target.value)} value={nameInput} className="w-[min(300px,95%)] outline-none border-b-2 text-center text-6xl duration-200" />
            <input type="text" onChange={(event) => setHexColorInput(event.target.value.toUpperCase())} value={hexColorInput} className={`mt-4 w-[100px] outline-none border-b-2 text-center text-xl duration-200 ${!validHex ? "border-red-500" : "border-black dark:border-white"}`} />
            <div className="flex flex-row mt-6">
                <button onClick={cancelAddColor} className="bg-gray-500 text-white text-2xl pt-2 lg:pt-2 pb-1 pl-6 pr-6 rounded-4xl hover:bg-gray-600 duration-200 cursor-pointer mr-1">Cancel</button>
                <button onClick={() => addColor(nameInput, hexColorInput)} className="disabled:bg-gray-500 bg-green-600 dark:bg-green-800 text-white text-2xl pt-2 lg:pt-2 pb-1 pl-6 pr-6 rounded-4xl not-disabled:hover:bg-green-700 not-disabled:dark:hover:bg-green-900 duration-200 cursor-pointer disabled:cursor-not-allowed ml-1" disabled={!validHex || nameInput.length === 0}>Add</button>
            </div>
        </div>
    );
}