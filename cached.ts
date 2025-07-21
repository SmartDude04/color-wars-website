import { unstable_cache } from "next/cache";
import { prisma } from "@/prisma";

export const getActivitiesCached = unstable_cache(
    async () => {
        return prisma.activity.findMany({
            orderBy: {
                name: "asc"
            }
        });
    },
    [],
    {
        tags: ["activities"],
        revalidate: false
    }
);

export const getColorsCached = unstable_cache(
    async () => {
        return prisma.color.findMany({
            orderBy: {
                name: "asc"
            }
        });
    },
    [],
    {
        tags: ["colors"],
        revalidate: false
    }
);

export const getUsersCached = unstable_cache(
    async () => {
        return prisma.user.findMany({
            select: {
                id: true,
                username: true,
                role: true,
                verified: true
            },
            orderBy: {
                username: "asc"
            }
        });
    },
    [],
    {
        tags: ["users"],
        revalidate: false
    }
);


export const getGroupsCached = unstable_cache(
    async () => {
        return prisma.group.findMany({
            orderBy: {
                name: "asc"
            }
        });
    },
    [],
    {
        tags: ["groups"],
        revalidate: false
    }
);

export const getPointsCached = unstable_cache(
    async () => {
        return prisma.point.findMany({
            select: {
                id: true,
                amount: true,
                timestamp: true,
                description: true,
                group: {
                    select: {
                        name: true,
                        color: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                activity: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                timestamp: "desc"
            },
            take: 50
        });
    },
    [],
    {
        tags: ["points"],
        revalidate: false
    }
);

const getColorsWithGroupsCached = unstable_cache(
    async () => {
        return prisma.color.findMany({
            select: {
                id: true,
                name: true,
                hexColor: true,
                groups: {
                    select: {
                        name: true
                    },
                    orderBy: {
                        name: "asc"
                    }
                }
            }
        });
    },
    [],
    {
        tags: ["colors", "groups"],
        revalidate: false
    }
);

export const getColorsWithGroupsAndPointsCached = unstable_cache(
    async () => {
        const colorsWithGroups = await getColorsWithGroupsCached();

        // Combine the colors and groups with their respective points
        // Promise.all is used to concurrently map all colors and return data instead of a promise
        const colorsWithGroupsAndPoints = await Promise.all(
            colorsWithGroups.map(async (color) => {
                const pointsData = await prisma.point.aggregate({
                    _sum: {
                        amount: true
                    },
                    where: {
                        group: {
                            colorId: color.id
                        }
                    }
                });

                return {
                    id: color.id,
                    name: color.name,
                    hexColor: color.hexColor,
                    amount: pointsData._sum.amount || 0,
                    groups: color.groups
                };
            })
        );

        // Data is sorted by points then by name
        return colorsWithGroupsAndPoints.sort((a, b) => {
            if (a.amount === b.amount) {
                return a.name.localeCompare(b.name);
            }
            return b.amount - a.amount;
        });
    },
    [],
    {
        tags: ["colors", "groups", "points"],
        revalidate: false
    }
);

export const getIsBlurredCached = unstable_cache(
    async () => {
        const numEntries = await prisma.blur.count({
            where: {
                blurred: true
            }
        });

        if (numEntries !== 0 && numEntries !== 1) {
            await prisma.blur.deleteMany();
            throw new Error("A database error occurred checking if points should be blurred. Try again.");
        }

        return numEntries === 1;
    },
    [],
    {
        tags: ["blur"],
        revalidate: false
    }
)