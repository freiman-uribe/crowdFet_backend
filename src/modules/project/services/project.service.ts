
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

      const project = await this.prisma.project.create({
        data: {
          title: data.title,
          subtitle: data.subtitle,
          video: data.video,
          fundingAmount: Number(data.montoMeta),
          launchDate: new Date(data.dateLaunch),
          campaignDuration: new Date(data.durationCampaign),
          status: "pending", // Valor por defecto 'pending'
          imageId: urlImageProject.id,
          categoryId: data.categoryId,
          subCategoryId: data.subCategoryId,
          deparmentId: data.deparment,
          municipalityId: data.municipality,
          history: {
            create: {
              risksChallenges: data.history.riesgos,
              aiUsage: data.history.usoIA === "noActivar" ? false : true,
              projectHistoryId: historyFile.id,
            },
          },
        },
      });
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
          itemId: item.id,
        });
      }

      for (let index = 0; index < data.rewards.length; index++) {
        const reward = data.rewards[index];
        const elementsId = reward.selectedOptions.split(",");

        const elementsForReward = elementsSaving
          .filter((element) => elementsId.includes(element.itemId))
          .map((eleme) => {
            delete eleme.itemId;
            return eleme;
          });

        delete reward.selectedOptions;
        await this.prisma.reward.create({
          data: {
            ...reward,
            pledgedAmount: Number(reward.pledgedAmount),
            availability: Number(reward.availability),
            limitTime: new Date(reward.limitTime),
            estimatedDelivery: new Date(reward.estimatedDelivery),
            shipping: Boolean(reward.shipping),
            projectId: project.id,
            imageId: null,
            elements: {
              createMany: {
                data: elementsForReward,
              },
            },
          },
        });
      }

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
        include: { category: true, image: true },
      }),
      this.prisma.project.count(), // Total de proyectos
    ]);

    // Obtener conteo y suma de transacciones para cada proyecto
    const transactionStats = await this.prisma.transactions.groupBy({
      by: ["projectId"],
      where: {
        statusTransaction: "APPROVED",
      },
      _count: {
        id: true,
      },
      _sum: {
        mount: true,
      },
    });

    // Crear un mapa para acceder rápidamente a las estadísticas por projectId
    const statsMap = new Map(
      transactionStats.map((stat) => [stat.projectId, stat])
    );

    // Mapear los proyectos con los datos adicionales
    const projectsWithStats = projects.map((project) => {
      const stats = statsMap.get(project.id) || {
        _count: { id: 0 },
        _sum: { mount: 0 },
      };
      return {
        ...project,
        image: project.image.fileUrl,
        category: project.category.name,
        transaction: {
          count: stats._count.id,
          totalSum: stats._sum.mount || 0,
        },
      };
    });

    return {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      projects: projectsWithStats,
    };

    // return {
    //   total,
    //   totalPages: Math.ceil(total / limit),
    //   currentPage: page,
    //   projects: projects.map((project) => ({
    //     ...project,
    //     image: project.image.fileUrl,
    //     category: project.category.name,
    //   })),
    // };
  }

  // async findByStatus(page: number = 1, limit: number = 10): Promise<any> {
  //   const skip = (page - 1) * limit;
  //   const take = Number(limit);

  //   const [projects, total] = await Promise.all([
  //     this.prisma.project.findMany({
  //       skip,
  //       take,
  //       include: { category: true, image: true },
  //       where: {
  //         status: "approved",
  //         // status: "pending",
  //       },
  //     }),
  //     this.prisma.project.count({
  //       where: {
  //         status: "approved",
  //         // status: "pending",
  //       }
  //     }), // Total de proyectos
  //   ]);

  //   return {
  //     total,
  //     totalPages: Math.ceil(total / limit),
  //     currentPage: page,
  //     projects: projects.map((project) => ({
  //       ...project,
  //       image: project.image.fileUrl,
  //       category: project.category.name,
  //     })),
  //   };
  // }

  async findByStatus(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    // Obtener proyectos y datos agregados de transacciones
    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        include: { category: true, image: true },
        where: {
          status: "approved",
        },
      }),
      this.prisma.project.count({
        where: {
          status: "approved",
        },
      }),
    ]);

    // Obtener conteo y suma de transacciones para cada proyecto
    const transactionStats = await this.prisma.transactions.groupBy({
      by: ["projectId"],
      where: {
        statusTransaction: "APPROVED",
      },
      _count: {
        id: true,
      },
      _sum: {
        mount: true,
      },
    });

    // Crear un mapa para acceder rápidamente a las estadísticas por projectId
    const statsMap = new Map(
      transactionStats.map((stat) => [stat.projectId, stat])
    );

    // Mapear los proyectos con los datos adicionales
    const projectsWithStats = projects.map((project) => {
      const stats = statsMap.get(project.id) || {
        _count: { id: 0 },
        _sum: { mount: 0 },
      };
      return {
        ...project,
        image: project.image.fileUrl,
        category: project.category.name,
        transaction: {
          count: stats._count.id,
          totalSum: stats._sum.mount || 0,
        },
      };
    });

    return {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      projects: projectsWithStats,
    };
  }

  isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
  }

  async findById(id: string): Promise<any> {
    try {
      if (!this.isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }
      const project = await this.prisma.project.findUnique({
        include: {
          category: true,
          image: true,
          history: {
            include: { projectHistory: true },
          },
          // elements: true,
          rewards: {
            include: {
              // elements: true
              elements: { include: { image: true } },
            },
          },
        },
        where: {
          id: id,
        },
      });

      const transaction = await this.prisma.transactions.aggregate({
        where: {
          projectId: id,
          statusTransaction: "APPROVED",
        },
        _count: {
          id: true,
        },
        _sum: {
          mount: true,
        },
      });

      const history = Array.isArray(project.history)
        ? project.history[0]
        : project.history;

      return {
        ...project,
        transaction: {
          count: transaction._count.id,
          totalSum: transaction._sum.mount || 0,
        },
        image: project.image.fileUrl,
        category: project.category.name,
        file: history.projectHistory,
      };
    } catch (error) {
      console.error("erro>>", error);
    }
  }

  async findByUser(id: string, page: number = 1, limit: number = 10): Promise<any> {
    //  async findAll(page: number = 1, limit: number = 10): Promise<any> {
    const skip = (page - 1) * limit;
    const take = Number(limit);

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        skip,
        take,
        include: { category: true, image: true },
        where: {
          userId: id,
        },
      }),
      this.prisma.project.count({
        where: {
          userId: id,
        },
      }), // Total de proyectos
    ]);

    // Obtener conteo y suma de transacciones para cada proyecto
    const transactionStats = await this.prisma.transactions.groupBy({
      by: ["projectId"],
      where: {
        statusTransaction: "APPROVED",
      },
      _count: {
        id: true,
      },
      _sum: {
        mount: true,
      },
    });

    // Crear un mapa para acceder rápidamente a las estadísticas por projectId
    const statsMap = new Map(
      transactionStats.map((stat) => [stat.projectId, stat])
    );

    // Mapear los proyectos con los datos adicionales
    const projectsWithStats = projects.map((project) => {
      const stats = statsMap.get(project.id) || {
        _count: { id: 0 },
        _sum: { mount: 0 },
      };
      return {
        ...project,
        image: project.image.fileUrl,
        category: project.category.name,
        transaction: {
          count: stats._count.id,
          totalSum: stats._sum.mount || 0,
        },
      };
    });

    return {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      projects: projectsWithStats,
    };

    // return {
    //   total,
    //   totalPages: Math.ceil(total / limit),
    //   currentPage: page,
    //   projects: projects.map((project) => ({
    //     ...project,
    //     image: project.image.fileUrl,
    //     category: project.category.name,
    //   })),
    // };
  }


  async getProjectDataForId(id: string) {
    console.log("entre");
    return await this.prisma.project
      .findUnique({
        include: { category: true, image: true, rewards: {
          include: {
            elements: {
              include: {
                image: true
              }
            }
          }
        }, history: {
          include: {
            projectHistory: true
          }
        } },
        where: {
          id: id,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getProjectForId(id: string) {
    console.log("entre");
    return await this.prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async updateStatus(id: string): Promise<any> {
    try {
      if (!this.isValidUUID(id)) {
        throw new Error("Invalid UUID format");
      }

      await this.prisma.project.update({
        where: { id },
        data: { status: "approved" },
      });

      return {
        data: "Proyecto aprobado",
      };
    } catch (error) {
      console.error(error);
    }
  }
}
