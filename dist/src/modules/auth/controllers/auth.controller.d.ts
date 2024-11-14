import { AuthService } from '../services/auth.service';
import { AuthCreateUserDto, AuthDto } from '../dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    singIn(user: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    singUp(user: AuthCreateUserDto): Promise<{
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
        code_student: string | null;
        document: string | null;
        rol_id: string;
        phone: string | null;
        birthdate: Date | null;
        address: string | null;
        rh_id: string | null;
        program_academic_id: string | null;
    }>;
}
