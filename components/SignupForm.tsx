"use client";

import { handleSignup } from "@/app/signup/actions";
import { useActionState, useState } from "react";
import Image from "next/image";
import loadingSVG from "@/public/loading.svg";
import loadingSVGDark from "@/public/loading-white.svg"
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(handleSignup, "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { theme } = useTheme();

    const inputClass = "w-[90%] md:w-[80%] text-xl border-b-2 pt-2 pb-2 mt-6 mb-6 focus:outline-none focus:placeholder:text-transparent placeholder:text-black dark:placeholder:text-white";
    return (
        <form action={formAction} className="flex flex-col md:mt-12 items-center w-full duration-200">
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Name" className={inputClass} required/>
            <div className="w-full flex flex-row items-center justify-center">
                <input type={passwordVisible ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter A Password" className="w-[calc(90%-24px)] md:w-[calc(80%-24px)] text-xl border-b-2 pt-2 pb-2 mt-6 mb-6 focus:outline-none focus:placeholder:text-transparent placeholder:text-black dark:placeholder:text-white" required/>
                <div className="flex items-center justify-center h-[46px] border-b-2 duration-200">
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="dark:text-white text-black duration-200 cursor-pointer">
                        {passwordVisible ? (
                            <Eye width={24} height={24}/>
                        ) : (
                            <EyeOff width={24} height={24}/>
                        )}
                    </button>
                </div>
            </div>
            <p className="text-red-500 dark:text-red-700 text-center duration-200">{state}</p>
            <button type="submit" disabled={isPending || !username || !password} className="mt-12 w-[90%] md:w-[80%] bg-white dark:bg-[#2e2e2e] text-3xl pt-4 pb-2 md:pt-4 md:pb-4 rounded-4xl disabled:cursor-not-allowed cursor-pointer not-disabled:hover:bg-gray-200 dark:not-disabled:hover:bg-[#404040] duration-200 flex items-center justify-center">
                {isPending ? (
                    <Image alt="Loading..." src={theme === "dark" ? loadingSVGDark : loadingSVG} width={36} height={36} />
                ) : (
                    "Sign Up"
                )}
            </button>
        </form>
    );
}