import { getColorsWithGroupsAndPointsCached, getIsBlurredCached } from "@/cached";
import ColorPointsCard from "@/components/PointsCard/ColorPointsCard";
import "@/app/page.css";
import { auth } from "@/auth";

export default async function Page() {
    const colorsWithGroupsAndPoints = await getColorsWithGroupsAndPointsCached();
    const isBlurred = await getIsBlurredCached();
    const session = await auth();

    if (isBlurred && session?.user.role !== "admin") {
        // Sort the colors alphabetically and remove the points from getting to the user
        colorsWithGroupsAndPoints.sort((a, b) => a.name.localeCompare(b.name));
        colorsWithGroupsAndPoints.forEach(color => color.amount = 0);
    }

    return (
        <>
            { isBlurred && session?.user.role === "admin" && (
                <div className="w-full flex flex-col items-center justify-center bg-yellow-400 h-[64px]">
                    <h1 className="text-xl text-black w-[90%] text-center">Point values have been blurred</h1>
                    <h2 className="text-md text-black w-[90%] text-center">As an admin, you can still see them</h2>
                </div>
            )}
            <div className={`bg duration-200 bg-no-repeat bg-fixed bg-size-[500%] w-full ${isBlurred && session?.user.role === "admin" ? "h-[calc(100%-72px-64px)]" : "min-h-[calc(100%-72px)]"}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 p-4 sm:p-6">
                    {colorsWithGroupsAndPoints.map(color => (
                        <ColorPointsCard key={color.id} name={color.name} hexColor={color.hexColor} groups={color.groups} amount={color.amount} blurred={session?.user.role !== "admin" && isBlurred} />
                    ))}
                </div>
            </div>
        </>
    );
}