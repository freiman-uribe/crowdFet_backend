/*
  Warnings:

  - You are about to drop the column `faq` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `projectHistory` on the `History` table. All the data in the column will be lost.
  - Added the required column `projectHistoryId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "faq",
DROP COLUMN "projectHistory",
ADD COLUMN     "projectHistoryId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_projectHistoryId_fkey" FOREIGN KEY ("projectHistoryId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
