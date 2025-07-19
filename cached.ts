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

export const getPointsForColorCached = unstable_cache(
    async (colorId: string) => {
        return prisma.point.aggregate({
            _sum: {
                amount: true
            },
            where: {
                group: {
                    colorId: colorId
                }
            }
        });
    },
    [],
    {
        tags: ["points"],
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

export const getGroupsInColorCached = unstable_cache(
    async (colorId: string) => {
        return prisma.group.findMany({
            where: {
                colorId: colorId
            },
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
            take: 25
        });
    },
    [],
    {
        tags: ["points"],
        revalidate: false
    }
)