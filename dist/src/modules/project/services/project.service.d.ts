import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProjectDto } from '../dto/proyect.dto';
import { S3Service } from 'src/modules/common/services/aws-s3.service';
export declare class ProjectService {
    private prisma;
    private s3Servie;
    constructor(prisma: PrismaService, s3Servie: S3Service);
    createProject(data: CreateProjectDto, files?: any[]): Promise<{
        id: string;
        title: string;
        subtitle: string;
        video: string | null;
        fundingAmount: number;
        launchDate: Date | null;
        campaignDuration: Date | null;
        deparmentId: string;
        municipalityId: string;
        status: string;
        imageId: string;
        categoryId: string;
        subCategoryId: string;
    }>;
    findAll(page?: number, limit?: number): Promise<any>;
    findByStatus(page?: number, limit?: number): Promise<any>;
    isValidUUID(uuid: string): boolean;
    findById(id: string): Promise<any>;
}
