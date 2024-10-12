import { AuthCreateUserDto, AuthDto } from '../dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UserService } from 'src/modules/user/services/user.service';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    login(userCredentials: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getUserRolesValidated(user: User): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    validateUserCredentials(passwordCredential: string, passwordUser: string): Promise<any>;
    getTokens(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(user: AuthCreateUserDto): Promise<{
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
    }>;
}
