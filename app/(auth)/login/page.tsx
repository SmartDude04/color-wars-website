import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import colorSplashBackground from "@/public/color-splash-background.png";

export default function Page() {
    return (
        <div className={`bg-white w-full h-[calc(100dvh-72px)] flex justify-center items-center bg-contain bg-center bg-no-repeat`} style={{ backgroundImage: `url(${colorSplashBackground.src})` }}>
            <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(0,0,0,0.7)] duration-200">
                <div className="w-[min(600px,90%)] bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,0,0,0.2)] dark:border-[#5c5c5c] border-gray-300 border-2 backdrop-blur-sm shadow-lg flex flex-col justify-center items-center rounded-3xl pl-4 pr-4 pt-8 pb-12 md:p-10">
                    <h1 className="text-5xl pt-8 pb-4 md:pb-8">Login</h1>
                    <LoginForm />
                    <h2 className="text-md mt-6 text-center">Don&#39;t have an account? <Link href="/signup" className="underline">Create one here.</Link></h2>
                </div>
            </div>
        </div>
    );
}