-- AlterTable
ALTER TABLE "tbl_list_item" ADD COLUMN     "parentId" UUID;

-- AddForeignKey
ALTER TABLE "tbl_list_item" ADD CONSTRAINT "tbl_list_item_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tbl_list_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
