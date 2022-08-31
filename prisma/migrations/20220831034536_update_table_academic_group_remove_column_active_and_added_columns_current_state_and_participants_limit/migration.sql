/*
  Warnings:

  - You are about to drop the column `active` on the `AcademicGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AcademicGroup" DROP COLUMN "active",
ADD COLUMN     "currentState" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "participantsLimit" INTEGER NOT NULL DEFAULT 15;
