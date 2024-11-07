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
}
