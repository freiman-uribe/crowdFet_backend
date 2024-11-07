-- DropForeignKey
ALTER TABLE "Elements" DROP CONSTRAINT "Elements_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Elements" DROP CONSTRAINT "Elements_rewardId_fkey";

-- AlterTable
ALTER TABLE "Elements" ALTER COLUMN "imageId" DROP NOT NULL,
ALTER COLUMN "rewardId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "Elements_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "Elements_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
