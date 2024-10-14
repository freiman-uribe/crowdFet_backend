/*
  Warnings:

  - You are about to drop the column `category` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `subCategory` on the `Project` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "category",
DROP COLUMN "subCategory",
ADD COLUMN     "categoryId" UUID NOT NULL,
ADD COLUMN     "subCategoryId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "tbl_list_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
