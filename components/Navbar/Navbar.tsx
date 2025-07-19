import DesktopNavbarAuth from "@/components/Navbar/DesktopNavbarAuth";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import NavbarLogo from "@/components/Navbar/NavbarLogo";
import DesktopNavbarLinks from "@/components/Navbar/DesktopNavbarLinks";
import MobileNavbarLinks from "@/components/Navbar/MobileNavbarLinks";
import { Suspense } from "react";

export default function Navbar() {
    return (
        <nav className="w-full bg-white dark:bg-[#222227] h-18 pl-5 pr-5 flex flex-row items-center justify-between duration-200">
            <div className="flex flex-row items-center">
                <NavbarLogo />
                <div className="hidden lg:flex flex-row items-center">
                    <DesktopNavbarLinks />
                </div>
            </div>
            <div className="hidden lg:flex flex-row items-center">
                <DesktopNavbarAuth/>
                <div className="ml-2">
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="flex lg:hidden flex-row items-center">
                <MobileNavbarLinks />
            </div>
        </nav>
    );
}