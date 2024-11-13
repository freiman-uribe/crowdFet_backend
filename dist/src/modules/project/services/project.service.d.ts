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
    getProjectDataForId(id: string): Promise<{
        history: {
            id: string;
            risksChallenges: string;
            aiUsage: boolean;
            projectHistoryId: string;
            projectId: string;
        }[];
        rewards: {
            id: string;
            title: string;
            description: string;
            pledgedAmount: number;
            availability: number;
            limitTime: Date | null;
            content: string;
            estimatedDelivery: Date;
            shipping: boolean;
            projectId: string;
            imageId: string | null;
        }[];
        image: {
            id: string;
            fileName: string;
            fileType: string;
            fileSize: number;
            fileUrl: string;
            uploadedAt: Date;
        };
        category: {
            id: string;
            created_by: string | null;
            created_at: Date;
            modified_by: string | null;
            updated_at: Date;
            status: boolean;
            listType_id: string;
            code: string | null;
            name: string;
            description: string;
            meta: string | null;
            order: number | null;
            parentId: string | null;
        };
    } & {
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
    updateStatus(id: string): Promise<any>;
}
