
import {
  Injectable,
  HttpException
} from '@nestjs/common';
import { Rol, User } from '@prisma/client';
import { AuthCreateUserDto } from 'src/modules/auth/dtos/auth.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { ROLES } from 'src/constants/roles';
import { CreateProjectDto } from '../dto/proyect.dto';
import { S3Service } from 'src/modules/common/services/aws-s3.service';
import { IMulterFile } from 'src/types/multer';
import { title } from 'process';
import { Project } from "@prisma/client";

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private s3Servie: S3Service
  ) {}

  /**
   * Crea un usuario con los datos dados.
   * @param userData Datos del usuario a crear.
   * @returns Promesa que se resuelve con el usuario creado.
   * @throws {HttpException} Si el usuario ya existe.
   */

  async createProject(data: CreateProjectDto, files: any[] = []) {
    try {
      const fileImage = files.find((item) => item.fieldname === "file");

      // console.log(data, 'data', fileImage)
      const urlImageProject = await this.s3Servie.uploadFile(
        fileImage,
        "projects-crowd-fet/"
      );
      const findFileHistory = files.find(
        (item) => item.fieldname === "history[file]"
      );
      const historyFile = await this.s3Servie.uploadFile(
        findFileHistory,
        "projects-crowd-fet/history/"
      );

      console.log(urlImageProject, "urlImageProjecturlImageProject");
      let elementsSaving = [];
      for (let index = 0; index < data.elements.length; index++) {
        const item = data.elements[index];
        const fileElement = files.find(
          (file) => file.fieldname === `elements[${index}][imageId]`
        );

        const dataFile = fileElement
          ? await this.s3Servie.uploadFile(
              fileElement,
              "projects-crowd-fet/elements/"
            )
          : null;
        elementsSaving.push({
          title: item.title,
          imageId: fileElement ? dataFile.id : null,
          rewardId: item.rewardId,
        });
      }
      console.log(data.history, "elementsSavingelementsSaving");
      const project = await this.prisma.project.create({
        data: {
          title: data.title,
          subtitle: data.subtitle,
          video: data.videoUrl,
          fundingAmount: Number(data.montoMeta),
          launchDate: new Date(data.dateLaunch),
          campaignDuration: new Date(data.durationCampaign),
          status: "pending", // Valor por defecto 'pending'
          imageId: urlImageProject.id,
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
          deparmentId: data.deparment,
          municipalityId: data.municipality,

          elements: {
            createMany: {
              data: elementsSaving,
            },
          },
          history: {
            create: {
              risksChallenges: data.history.riesgos,
              aiUsage: data.history.usoIA === "noActivar" ? false : true,
              projectHistoryId: historyFile.id,
            },
          },
        },
      });

      console.log("Project created:", project);
      return project;
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const take = Number(limit);
    
    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        include: { category: true },
      }),
      this.prisma.project.count(), // Total de proyectos
    ]);

    return {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      projects: projects.map((project) => ({
        ...project,
        category: project.category.name,
      })),
    };
  }
}
