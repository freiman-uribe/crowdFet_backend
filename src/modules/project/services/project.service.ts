
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

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService
  ) {}

  /**
   * Crea un usuario con los datos dados.
   * @param userData Datos del usuario a crear.
   * @returns Promesa que se resuelve con el usuario creado.
   * @throws {HttpException} Si el usuario ya existe.
   */
  
async createProject(data: CreateProjectDto) {
  try {
    const project = await this.prisma.project.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        location: data.location,
        video: data.video,
        fundingAmount: data.fundingAmount,
        launchDate: data.launchDate, // Fecha opcional
        campaignDuration: data.campaignDuration,
        status: 'pending', // Valor por defecto 'pending'
        imageId: data.imageId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId
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
