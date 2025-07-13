import { prisma } from "@/prisma";
import ColorPointsCard from "@/components/PointsCard/ColorPointsCard";
import "@/app/(default)/page.css";

export default async function Page() {
    const colors = await prisma.color.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return (
        <div className="bg duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {colors.map(team => (
                    <ColorPointsCard key={team.id} colorName={team.name} hexColor={team.hexColor} colorId={team.id} />
                ))}
            </div>
        </div>
    );
}