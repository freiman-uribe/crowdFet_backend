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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt_1 = require("bcrypt");
const roles_1 = require("../../../constants/roles");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(userData) {
        console.log('entre');
        const findUser = await this.getByEmail(userData.email);
        const findUserCode = await this.getByCodeStudent(userData.code_student);
        const findUserDocument = await this.getByDocument(userData.document);
        if (findUser || findUserCode || findUserDocument) {
            throw new common_1.HttpException('El usuario ya existe', 400);
        }
        console.log('entre4');
        const roleStudent = await this.getRolByCode(roles_1.ROLES.STUDENT);
        const passwordEncipted = (0, bcrypt_1.hashSync)(userData.password, 10);
        console.log('entre3', userData.code_program);
        try {
            const userCreate = await this.prisma.user.create({
                data: {
                    document: userData.document,
                    code_student: userData.code_student,
                    email: userData.email,
                    password: passwordEncipted,
                    full_name: userData.full_name,
                    last_name: userData.last_name,
                    program_academic_id: userData.code_program,
                    rol_id: roleStudent.id,
                    updated_at: new Date(),
                }
            });
            delete userCreate.password;
            return userCreate;
        }
        catch (err) {
            console.log('entre2', err);
            throw new common_1.HttpException(err, 400);
        }
    }
    getByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                rol: {
                    select: {
                        code: true
                    }
                }
            }
        });
    }
    getByCodeStudent(code_student) {
        return this.prisma.user.findUnique({
            where: {
                code_student
            }
        });
    }
    getByDocument(document) {
        return this.prisma.user.findUnique({
            where: {
                document
            }
        });
    }
    getRolByCode(code) {
        return this.prisma.rol.findUnique({
            where: {
                code
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map