import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
export declare class ProjectAdminController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    updateStatusProject(id: string, data: CreateProjectDto): Promise<{
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
}
