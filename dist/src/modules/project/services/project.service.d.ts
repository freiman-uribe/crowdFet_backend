import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProjectDto } from '../dto/proyect.dto';
import { S3Service } from 'src/modules/common/services/aws-s3.service';
import { IMulterFile } from 'src/types/multer';
export declare class ProjectService {
    private prisma;
    private s3Servie;
    constructor(prisma: PrismaService, s3Servie: S3Service);
    createProject(data: CreateProjectDto, fileImage?: IMulterFile): Promise<{
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
}
