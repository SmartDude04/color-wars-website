import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const connectionString =
    process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL
        : (process.env.DIRECT_URL ?? process.env.DATABASE_URL);

if (!connectionString) {
    throw new Error("Missing database connection string. Set DIRECT_URL and/or DATABASE_URL.");
}

const adapter = new PrismaPg({
    connectionString,
});

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;