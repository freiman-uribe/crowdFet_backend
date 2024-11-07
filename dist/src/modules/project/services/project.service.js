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
    async createProject(data, files = []) {
        try {
            const fileImage = files.find(item => (item.fieldname === 'file'));
            const urlImageProject = await this.s3Servie.uploadFile(fileImage, 'projects-crowd-fet/');
            const findFileHistory = files.find(item => (item.fieldname === 'history[file]'));
            const historyFile = await this.s3Servie.uploadFile(findFileHistory, 'projects-crowd-fet/history/');
            console.log(urlImageProject, 'urlImageProjecturlImageProject');
            let elementsSaving = [];
            for (let index = 0; index < data.elements.length; index++) {
                const item = data.elements[index];
                const fileElement = files.find(file => file.fieldname === `elements[${index}][imageId]`);
                const dataFile = fileElement ? await this.s3Servie.uploadFile(fileElement, 'projects-crowd-fet/elements/') : null;
                elementsSaving.push({
                    title: item.title,
                    imageId: fileElement ? dataFile.id : null,
                    rewardId: item.rewardId
                });
            }
            console.log(data.history, 'elementsSavingelementsSaving');
            const project = await this.prisma.project.create({
                data: {
                    title: data.title,
                    subtitle: data.subtitle,
                    video: data.videoUrl,
                    fundingAmount: Number(data.montoMeta),
                    launchDate: new Date(data.dateLaunch),
                    campaignDuration: new Date(data.durationCampaign),
                    status: 'pending',
                    imageId: urlImageProject.id,
                    categoryId: data.categoryId,
                    subCategoryId: data.subCategoryId,
                    deparmentId: data.deparment,
                    municipalityId: data.municipality,
                    elements: {
                        createMany: {
                            data: elementsSaving
                        }
                    },
                    history: {
                        create: {
                            risksChallenges: data.history.riesgos,
                            aiUsage: data.history.usoIA === 'noActivar' ? false : true,
                            projectHistoryId: historyFile.id,
                        }
                    }
                }
            });
            console.log('Project created:', project);
            return project;
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