import DesktopNavbarAuth from "@/components/Navbar/DesktopNavbarAuth";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import DesktopNavbarLinks from "@/components/Navbar/DesktopNavbarLinks";
import MobileNavbarLinks from "@/components/Navbar/MobileNavbarLinks";
import Image from "next/image";
import colorWarsLogo from "@/public/color-wars-main.png";
import colorWarsLogoDark from "@/public/color-wars-main-dark.png";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-white dark:bg-[#222227] h-18 pl-5 pr-5 flex flex-row items-center justify-between duration-200">
            <div className="flex flex-row items-center">
                <Link href="/">
                    <Image src={colorWarsLogo} width={198} height={57} alt="Color Wars Logo" className="dark:hidden"/>
                    <Image src={colorWarsLogoDark} width={198} height={57} alt="Color Wars Logo" className="hidden dark:block"/>
                </Link>
                <div className="hidden xl:flex flex-row items-center">
                    <DesktopNavbarLinks />
                </div>
            </div>
            <div className="hidden xl:flex flex-row items-center">
                <DesktopNavbarAuth/>
                <div className="ml-2">
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="flex xl:hidden flex-row items-center">
                <MobileNavbarLinks />
            </div>
        </nav>
    );
}