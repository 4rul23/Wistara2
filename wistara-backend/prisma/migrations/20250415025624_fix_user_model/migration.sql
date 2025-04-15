/*
  Warnings:

  - You are about to drop the column `accommodation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `activities` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `travelSeason` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `travelStyle` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "accommodation",
DROP COLUMN "activities",
DROP COLUMN "travelSeason",
DROP COLUMN "travelStyle",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "needsProfileUpdate" BOOLEAN NOT NULL DEFAULT true;
