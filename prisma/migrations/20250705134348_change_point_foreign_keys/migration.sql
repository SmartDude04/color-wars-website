/*
  Warnings:

  - You are about to drop the column `teamId` on the `Point` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_teamId_fkey";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "teamId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
