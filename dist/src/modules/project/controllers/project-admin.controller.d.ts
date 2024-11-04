import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
export declare class ProjectAdminController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    updateStatusProject(id: string, data: CreateProjectDto): Promise<void>;
}
