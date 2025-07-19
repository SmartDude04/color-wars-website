/*
  Warnings:

  - Added the required column `activityName` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Point" ADD COLUMN     "activityName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_activityName_fkey" FOREIGN KEY ("activityName") REFERENCES "Activity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
