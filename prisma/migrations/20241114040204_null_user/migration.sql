-- DropForeignKey
ALTER TABLE "tbl_transacions" DROP CONSTRAINT "tbl_transacions_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "tbl_transacions" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
