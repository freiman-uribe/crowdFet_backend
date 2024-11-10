import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(data: CreateProjectDto, files: any[]): Promise<{
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
    getProjects(page?: number, limit?: number): Promise<any>;
    getListProjects(page?: number, limit?: number): Promise<any>;
    getProjectId(id: any): Promise<any>;
    getProject(id: string): Promise<{
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
        history: {
            id: string;
            risksChallenges: string;
            aiUsage: boolean;
            projectHistoryId: string;
            projectId: string;
        }[];
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
}
