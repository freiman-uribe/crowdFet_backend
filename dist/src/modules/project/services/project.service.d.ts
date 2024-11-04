import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProjectDto } from '../dto/proyect.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(data: CreateProjectDto): Promise<void>;
}
