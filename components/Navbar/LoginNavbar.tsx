import NavbarLogo from "@/components/Navbar/NavbarLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function LoginNavbar() {
    return (
        <nav className="w-full bg-white dark:bg-[#222227] h-18 pl-5 pr-5 flex flex-row items-center justify-between duration-200">
            <NavbarLogo />
            <ThemeSwitcher />
        </nav>
    )
}