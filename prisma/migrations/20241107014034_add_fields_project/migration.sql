/*
  Warnings:

  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - The `campaignDuration` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `deparmentId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalityId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "location",
ADD COLUMN     "deparmentId" UUID NOT NULL,
ADD COLUMN     "municipalityId" UUID NOT NULL,
DROP COLUMN "campaignDuration",
ADD COLUMN     "campaignDuration" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_deparmentId_fkey" FOREIGN KEY ("deparmentId") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
