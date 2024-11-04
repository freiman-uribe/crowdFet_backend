import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProjectService } from "./services/project.service";
import { ProjectAdminController } from "./controllers/project-admin.controller";

@Module({
  imports: [],
  controllers: [],
  providers: [ProjectAdminController, ProjectService, PrismaService],
  exports: [],
})
export class ProjectModule {}
