/*
  Warnings:

  - Added the required column `projectId` to the `Elements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elements" ADD COLUMN     "projectId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "Elements_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
