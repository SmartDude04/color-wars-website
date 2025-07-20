/*
  Warnings:

  - You are about to drop the column `activityName` on the `Point` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_activityName_fkey";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "activityName";

-- DropTable
DROP TABLE "Activity";
