import { ConfigService } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProjectService } from "./services/project.service";
import { ProjectAdminController } from "./controllers/project-admin.controller";
import { ProjectController } from "./controllers/proyect.controller";
import { S3Service } from "../common/services/aws-s3.service";

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectAdminController, ProjectService, PrismaService, S3Service, ConfigService],
  exports: [],
})
export class ProjectModule {}
