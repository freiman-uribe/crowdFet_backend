-- CreateTable
CREATE TABLE "tbl_rol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "code" TEXT NOT NULL,

    CONSTRAINT "tbl_rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_academic_program" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,
    "code" TEXT,

    CONSTRAINT "tbl_academic_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta" TEXT,

    CONSTRAINT "list_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_list_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "listType_id" UUID NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meta" TEXT,
    "order" INTEGER,

    CONSTRAINT "tbl_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "full_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "code_student" TEXT NOT NULL,
    "document" TEXT,
    "rol_id" UUID NOT NULL,
    "phone" TEXT,
    "birthdate" TIMESTAMP(3),
    "address" TEXT,
    "rh_id" UUID,
    "program_academic_id" UUID,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rol_code_key" ON "tbl_rol"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_academic_program_code_key" ON "tbl_academic_program"("code");

-- CreateIndex
CREATE UNIQUE INDEX "list_type_code_key" ON "list_type"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_list_item_code_key" ON "tbl_list_item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_email_key" ON "tbl_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_code_student_key" ON "tbl_user"("code_student");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_document_key" ON "tbl_user"("document");

-- AddForeignKey
ALTER TABLE "tbl_list_item" ADD CONSTRAINT "tbl_list_item_listType_id_fkey" FOREIGN KEY ("listType_id") REFERENCES "list_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "tbl_rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_rh_id_fkey" FOREIGN KEY ("rh_id") REFERENCES "tbl_list_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_program_academic_id_fkey" FOREIGN KEY ("program_academic_id") REFERENCES "tbl_academic_program"("id") ON DELETE SET NULL ON UPDATE CASCADE;
