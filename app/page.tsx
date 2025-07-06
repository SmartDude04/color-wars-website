import { prisma } from "@/prisma";
import TeamPointsCard from "@/components/TeamPointsCard";
import "@/app/page.css";

export default async function Page() {
    const teams = await prisma.team.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return (
        <div className="bg duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {teams.map(team => (
                    <TeamPointsCard key={team.id} teamName={team.name} teamHexColor={team.hexColor} teamId={team.id} />
                ))}
            </div>
        </div>
    );
}