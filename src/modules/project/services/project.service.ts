
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
  
async createProject(data: CreateProjectDto, fileImage: IMulterFile = null) {
  try {
    const urlImageProject = await this.s3Servie.uploadFile(fileImage, 'projects-crowd-fet/')

    const project = await this.prisma.project.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        video: data.video,
        fundingAmount: data.montoMeta,
        launchDate: data.dateLaunch, // Fecha opcional
        campaignDuration: data.campaignDuration,
        status: 'pending', // Valor por defecto 'pending'
        imageId: urlImageProject,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        deparmentId: data.deparment,
        municipalityId: data.municipality,
        
        // Si deseas añadir recompensas, aprobaciones, etc.
        // rewards: {
        //   create: [
        //     {
        //       title: 'Early Bird Special',
        //       description: 'Exclusive reward for early backers',
        //       amount: 50.0,
        //     },
        //   ]
        // }
      }
    });

    console.log('Project created:', project);
  } catch (error) {
    console.error('Error creating project:', error);
  } finally {
    await this.prisma.$disconnect();
  }
}
}
