/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "ExternalResourceType" AS ENUM ('ARTICLE', 'RESEARCH_PAPER', 'TUTORIAL', 'REFERENCE_MATERIAL', 'SUPPLEMENTARY_CONTENT');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ADD COLUMN     "learningPreferences" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- CreateTable
CREATE TABLE "ExternalResource" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "resourceType" "ExternalResourceType" NOT NULL,

    CONSTRAINT "ExternalResource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalResource" ADD CONSTRAINT "ExternalResource_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TrainingModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
