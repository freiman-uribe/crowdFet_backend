-- CreateTable
CREATE TABLE "ProjectComments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "ProjectComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectComments" ADD CONSTRAINT "ProjectComments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
