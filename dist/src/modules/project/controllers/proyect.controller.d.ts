import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
import { IMulterFile } from 'src/types/multer';
interface FilesProject {
    file: IMulterFile;
}
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(data: CreateProjectDto, files: FilesProject): Promise<{
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
export {};
