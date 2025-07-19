import colorSplashBackground from "@/public/color-splash-background.png";
import AddPointsForm from "@/components/add-points/AddPointsForm";
import { getActivitiesCached, getColorsCached, getGroupsCached } from "@/cached";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    // Prevent unauthorized access to this page
    const session = await auth();
    if (session?.user.role === "admin") {
        const colors = await getColorsCached();
        const groups = await getGroupsCached();
        const activities = await getActivitiesCached();

        return (
            <div className={`bg-white w-full h-[calc(100dvh-72px)] flex justify-center items-center bg-contain bg-center bg-no-repeat`} style={{ backgroundImage: `url(${colorSplashBackground.src})` }}>
                <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(0,0,0,0.7)] duration-200">
                    <div className="w-[min(600px,90%)] bg-[rgba(255,255,255,0.6)] dark:bg-[rgba(0,0,0,0.2)] dark:border-[#5c5c5c] border-gray-300 border-2 z-0 backdrop-blur-sm shadow-lg flex flex-col justify-center items-center rounded-3xl pl-4 pr-4 pt-8 pb-12 md:p-10">
                        <h1 className="text-5xl pt-8 pb-2 md:pb-6">Add Points</h1>
                        <AddPointsForm colors={colors} groups={groups} activities={activities} />
                    </div>
                </div>
            </div>
        );
    }

    redirect("/");
}