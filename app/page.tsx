import { getColorsWithGroupsAndPointsCached, getIsBlurredCached } from "@/cached";
import ColorPointsCard from "@/components/PointsCard/ColorPointsCard";
import "@/app/page.css";

export default async function Page() {
    const colorsWithGroupsAndPoints = await getColorsWithGroupsAndPointsCached();
    const isBlurred = await getIsBlurredCached();

    if (isBlurred) {
        // Sort the colors alphabetically and remove the points from getting to the user
        colorsWithGroupsAndPoints.sort((a, b) => a.name.localeCompare(b.name));
        colorsWithGroupsAndPoints.forEach(color => color.amount = 0);
    }

    return (
        <div className="bg duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6 p-4 sm:p-6">
                {colorsWithGroupsAndPoints.map(color => (
                    <ColorPointsCard key={color.id} name={color.name} hexColor={color.hexColor} groups={color.groups} amount={color.amount} blurred={isBlurred} />
                ))}
            </div>
        </div>
    );
}