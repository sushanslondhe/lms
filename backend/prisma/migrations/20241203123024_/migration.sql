/*
  Warnings:

  - You are about to drop the column `modeuleId` on the `Enrollment` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_modeuleId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "modeuleId",
ADD COLUMN     "moduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TrainingModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
