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
        userId: string | null;
    }>;
    getProjects(page?: number, limit?: number): Promise<any>;
    getListProjects(page?: number, limit?: number): Promise<any>;
    getListProjectsUser(id: any, page?: number, limit?: number): Promise<any>;
    getListProjectsInversor(id: any, page?: number, limit?: number): Promise<any>;
    getProjectId(id: any): Promise<any>;
    getProject(id: string): Promise<void | ({
        history: ({
            projectHistory: {
                id: string;
                fileName: string;
                fileType: string;
                fileSize: number;
                fileUrl: string;
                uploadedAt: Date;
            };
        } & {
            id: string;
            risksChallenges: string;
            aiUsage: boolean;
            projectHistoryId: string;
            projectId: string;
        })[];
        rewards: ({
            elements: ({
                image: {
                    id: string;
                    fileName: string;
                    fileType: string;
                    fileSize: number;
                    fileUrl: string;
                    uploadedAt: Date;
                };
            } & {
                id: string;
                title: string;
                imageId: string | null;
                rewardId: string | null;
            })[];
        } & {
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
        })[];
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
        userId: string | null;
    })>;
    activeProject(id: any): Promise<any>;
}
