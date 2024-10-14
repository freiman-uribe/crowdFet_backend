-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "video" TEXT,
    "fundingAmount" DOUBLE PRECISION NOT NULL,
    "launchDate" TIMESTAMP(3),
    "campaignDuration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "imageId" UUID NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pledgedAmount" DOUBLE PRECISION NOT NULL,
    "availability" INTEGER NOT NULL,
    "limitTime" TIMESTAMP(3),
    "content" TEXT NOT NULL,
    "estimatedDelivery" TIMESTAMP(3) NOT NULL,
    "shipping" BOOLEAN NOT NULL,
    "projectId" UUID NOT NULL,
    "imageId" UUID NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Elements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "imageId" UUID NOT NULL,
    "rewardId" UUID NOT NULL,

    CONSTRAINT "Elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "risksChallenges" TEXT NOT NULL,
    "aiUsage" BOOLEAN NOT NULL,
    "projectHistory" TEXT NOT NULL,
    "faq" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approval" (
    "id" SERIAL NOT NULL,
    "projectId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "approvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comments" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "Elements_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Elements" ADD CONSTRAINT "Elements_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approval" ADD CONSTRAINT "Approval_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
