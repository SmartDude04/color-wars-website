import SignupForm from "@/components/SignupForm";
import colorSplashBackground from "@/public/color-splash-background.png";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signup - Color Wars"
}

export default function Page() {
    return (
        <div className={`bg-white w-full min-h-[calc(100dvh-72px)] flex justify-center items-center bg-contain bg-center bg-no-repeat`} style={{ backgroundImage: `url(${colorSplashBackground.src})` }}>
            <div className="w-full min-h-[calc(100dvh-72px)] flex justify-center items-center bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(0,0,0,0.7)]">
                <div className="w-[min(600px,90%)] bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,0,0,0.2)] dark:border-[#5c5c5c] border-gray-300 border-2 z-0 backdrop-blur-sm shadow-lg flex flex-col justify-center items-center rounded-3xl pl-4 pr-4 pt-8 pb-12 md:p-10 mt-8 mb-8">
                    <h1 className="text-5xl pt-8 pb-4 md:pb-8">Signup</h1>
                    <SignupForm />
                    <h2 className="text-md mt-6 text-center">Have an account? <Link href="/login" className="underline">Log in here.</Link></h2>
                </div>
            </div>
        </div>
    );
}