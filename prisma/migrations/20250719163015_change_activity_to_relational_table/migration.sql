/*
  Warnings:

  - You are about to drop the column `activity` on the `Point` table. All the data in the column will be lost.
  - Added the required column `activityName` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" DROP COLUMN "activity",
ADD COLUMN     "activityName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_activityName_fkey" FOREIGN KEY ("activityName") REFERENCES "Activity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
