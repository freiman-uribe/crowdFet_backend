import { AuthService } from '../services/auth.service';
import { User } from '@prisma/client';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(userPayload: User): Promise<any>;
}
export {};
