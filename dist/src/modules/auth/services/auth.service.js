"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_service_1 = require("../../user/services/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login(userCredentials) {
        const { email, password } = userCredentials;
        try {
            const findUser = await this.userService.getByEmail(email);
            if (!findUser) {
                throw new Error('Usuario no encontrado');
            }
            const isValidPassword = await this.validateUserCredentials(password, findUser.password);
            if (!isValidPassword) {
                throw new Error('Credenciales del usuario invalidas');
            }
            return this.getTokens({
                id: findUser.id,
                full_name: findUser.full_name,
                last_name: findUser.last_name,
                code_student: findUser.code_student,
                email: findUser.email,
                rol: findUser.rol.code
            });
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Credenciales del usuario invalidas');
        }
    }
    getUserRolesValidated(user) {
        return this.userService.getByEmail(user.email);
    }
    async validateUserCredentials(passwordCredential, passwordUser) {
        return await (0, bcrypt_1.compare)(passwordCredential, passwordUser);
    }
    async getTokens(user) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(user, { expiresIn: '60m' }),
            this.jwtService.signAsync(user, { expiresIn: '7d' }),
        ]);
        return {
            access_token,
            refresh_token,
        };
    }
    register(user) {
        return this.userService.createUser(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map