"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const project_service_1 = require("./services/project.service");
const project_admin_controller_1 = require("./controllers/project-admin.controller");
const proyect_controller_1 = require("./controllers/proyect.controller");
const aws_s3_service_1 = require("../common/services/aws-s3.service");
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [proyect_controller_1.ProjectController],
        providers: [project_admin_controller_1.ProjectAdminController, project_service_1.ProjectService, prisma_service_1.PrismaService, aws_s3_service_1.S3Service, config_1.ConfigService],
        exports: [],
    })
], ProjectModule);
//# sourceMappingURL=project.module.js.map