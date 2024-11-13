-- CreateTable
CREATE TABLE "tbl_transacions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "reference" TEXT NOT NULL,
    "referenceProvider" TEXT,
    "mount" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "statusTransaction" TEXT NOT NULL,
    "equal_day" INTEGER NOT NULL,
    "amount_per_day" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "tbl_transacions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_transacions_reference_key" ON "tbl_transacions"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_transacions_referenceProvider_key" ON "tbl_transacions"("referenceProvider");

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tbl_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_transacions" ADD CONSTRAINT "tbl_transacions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
