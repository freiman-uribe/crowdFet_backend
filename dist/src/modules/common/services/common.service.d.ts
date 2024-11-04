import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class CommonService {
    private prisma;
    constructor(prisma: PrismaService);
    getListItemForCodesParents(codes: string[]): import(".prisma/client").Prisma.PrismaPromise<({
        listItem: {
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
        }[];
    } & {
        id: string;
        created_by: string | null;
        created_at: Date;
        modified_by: string | null;
        updated_at: Date;
        status: boolean;
        code: string | null;
        name: string;
        description: string;
        meta: string | null;
    })[]>;
    getListItemFormParent(id: string): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
}
