import Link from "next/link";
import { Undo2 } from "lucide-react";
import colorSplashBackground from "@/public/color-splash-background.png";

export default function Page() {
    return (
        <div className={`bg-white w-full h-[calc(100dvh-72px)] flex justify-center items-center)] bg-contain bg-center bg-no-repeat`} style={{ backgroundImage: `url(${colorSplashBackground.src})` }}>
            <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(0,0,0,0.7)] duration-200">
                <div className="w-[min(600px,90%)] bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,0,0,0.2)] dark:border-[#5c5c5c] border-gray-300 border-2 backdrop-blur-sm shadow-lg flex flex-col justify-center items-center rounded-3xl pl-4 pr-4 pt-8 pb-12 md:p-10">
                    <h1 className="text-5xl pt-8 pb-4 md:pb-8">Success!</h1>
                    <p className="text-xl text-center">
                        An account has been created and is awaiting verification. Once verified, you will be able to <Link href="/login" className="underline">log in</Link>.
                    </p>
                    <Link href="/" className="mt-12 w-[90%] md:w-[80%] bg-white dark:bg-[#2e2e2e] text-3xl pt-4 pb-2 md:pt-4 md:pb-4 rounded-4xl disabled:cursor-not-allowed cursor-pointer not-disabled:hover:bg-gray-200 dark:not-disabled:hover:bg-[#404040] duration-200 flex items-center justify-center"><Undo2 width={32} height={32} className="mr-2"/>Head Home</Link>
                </div>
            </div>
        </div>
    );
}