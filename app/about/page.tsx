import Image from "next/image";
import colorWarsLight from "@/public/color-wars-main.png";
import colorWarsDark from "@/public/color-wars-main-dark.png";

export default function Page() {
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center mt-8">
                <div className="max-w-[90%] p-4 pt-0 rounded-md bg-gray-200 dark:bg-[#333333]">
                    <Image src={colorWarsLight} alt="Color Wars Logo" width={600} height={173} className="dark:hidden" />
                    <Image src={colorWarsDark} alt="Color Wars Logo" width={600} height={173} className="hidden dark:block" />
                </div>
            </div>
            <div className="w-full pl-[5%] pr-[5%] mt-8">
                <div className="text-xl">
                    Welcome to <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-400 inline-block text-transparent bg-clip-text">Color Wars!</h1> One week each summer, groups are put into colors to compete
                    in challenges. Groups earn points for their color throughout the day. At the end of the week, a color is crowned winner.
                </div>
                <div className="text-xl mt-4">
                    This site was created in 2024 to help streamline Color Wars and provide
                    a way for counselors and families to keep track of points. I had a ton of fun making it, and I
                    look forward to the week of Color Wars each year! If you are interested, you can find the source
                    code for this website <a target="_blank" href="https://github.com/SmartDude04/color-wars-website" className="text-blue-500 underline">here</a>.
                    If you encounter any issues or find any bugs, please report them to me. I hope you enjoy!
                </div>
                <div className="mt-4 ml-4">- Aidan O&#39;Connor</div>
                <div className="ml-7 italic">Speciality Camp Head Counselor</div>
            </div>
        </div>
    );
}