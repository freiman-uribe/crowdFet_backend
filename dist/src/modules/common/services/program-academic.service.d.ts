import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class ProgramAcademicService {
    private prisma;
    constructor(prisma: PrismaService);
    getProgramsAcademics(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        created_by: string | null;
        created_at: Date;
        modified_by: string | null;
        updated_at: Date;
        status: boolean;
        name: string | null;
        code: string | null;
    }[]>;
}
