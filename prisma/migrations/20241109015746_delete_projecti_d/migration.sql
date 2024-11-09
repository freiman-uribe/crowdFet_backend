/*
  Warnings:

  - You are about to drop the column `projectId` on the `Elements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Elements" DROP CONSTRAINT "Elements_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_imageId_fkey";

-- AlterTable
ALTER TABLE "Elements" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Reward" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
