import { prisma } from "@/prisma";
import TeamPointsCard from "@/components/TeamPointsCard";
import styles from "./page.module.css";

export default async function Page() {
    const teams = await prisma.team.findMany();

    return (
        <div className={styles.bg}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {teams.map(team => (
                    <TeamPointsCard key={team.id} teamName={team.name} teamHexColor={team.hexColor} teamId={team.id} />
                ))}
            </div>
        </div>
    );
}