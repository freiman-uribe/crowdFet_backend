import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
export declare class CommonController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(data: CreateProjectDto): Promise<void>;
}
