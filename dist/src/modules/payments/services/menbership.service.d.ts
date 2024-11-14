import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class MembershipService {
    private prisma;
    constructor(prisma: PrismaService);
    updateExpiredPlans(): Promise<void>;
}
