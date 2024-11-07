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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const aws_s3_service_1 = require("../../common/services/aws-s3.service");
let ProjectService = class ProjectService {
    constructor(prisma, s3Servie) {
        this.prisma = prisma;
        this.s3Servie = s3Servie;
    }
    async createProject(data, fileImage = null) {
        try {
            const urlImageProject = await this.s3Servie.uploadFile(fileImage, 'projects-crowd-fet/');
            const project = await this.prisma.project.create({
                data: {
                    title: data.title,
                    subtitle: data.subtitle,
                    video: data.video,
                    fundingAmount: data.montoMeta,
                    launchDate: data.dateLaunch,
                    campaignDuration: data.campaignDuration,
                    status: 'pending',
                    imageId: urlImageProject,
                    categoryId: data.categoryId,
                    subCategoryId: data.subCategoryId,
                    deparmentId: data.deparment,
                    municipalityId: data.municipality,
                }
            });
            console.log('Project created:', project);
        }
        catch (error) {
            console.error('Error creating project:', error);
        }
        finally {
            await this.prisma.$disconnect();
        }
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        aws_s3_service_1.S3Service])
], ProjectService);
//# sourceMappingURL=project.service.js.map