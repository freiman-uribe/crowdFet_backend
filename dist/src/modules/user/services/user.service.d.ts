import { Rol, User } from '@prisma/client';
import { AuthCreateUserDto } from 'src/modules/auth/dtos/auth.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(userData: AuthCreateUserDto): Promise<User>;
    createOrUpdateUser(userData: AuthCreateUserDto): Promise<User>;
    getByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        rol: {
            code: string;
        };
    } & {
        id: string;
        created_by: string | null;
        created_at: Date;
        modified_by: string | null;
        updated_at: Date;
        status: boolean;
        full_name: string | null;
        last_name: string | null;
        email: string;
        password: string;
        code_student: string;
        document: string | null;
        rol_id: string;
        phone: string | null;
        birthdate: Date | null;
        address: string | null;
        rh_id: string | null;
        program_academic_id: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getByCodeStudent(code_student: string): Promise<User>;
    getByDocument(document: string): Promise<User>;
    getRolByCode(code: string): Promise<Rol>;
}
