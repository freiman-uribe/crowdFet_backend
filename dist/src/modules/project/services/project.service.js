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
            const fileImage = files.find((item) => item.fieldname === "file");
            const urlImageProject = await this.s3Servie.uploadFile(fileImage, "projects-crowd-fet/");
            const findFileHistory = files.find((item) => item.fieldname === "history[file]");
            const historyFile = await this.s3Servie.uploadFile(findFileHistory, "projects-crowd-fet/history/");
            const project = await this.prisma.project.create({
                data: {
                    title: data.title,
                    subtitle: data.subtitle,
                    video: data.video,
                    fundingAmount: Number(data.montoMeta),
                    launchDate: new Date(data.dateLaunch),
                    campaignDuration: new Date(data.durationCampaign),
                    status: "pending",
                    imageId: urlImageProject.id,
                    categoryId: data.categoryId,
                    subCategoryId: data.subCategoryId,
                    deparmentId: data.deparment,
                    municipalityId: data.municipality,
                    history: {
                        create: {
                            risksChallenges: data.history.riesgos,
                            aiUsage: data.history.usoIA === "noActivar" ? false : true,
                            projectHistoryId: historyFile.id,
                        },
                    },
                },
            });
            let elementsSaving = [];
            for (let index = 0; index < data.elements.length; index++) {
                const item = data.elements[index];
                const fileElement = files.find((file) => file.fieldname === `elements[${index}][imageId]`);
                const dataFile = fileElement
                    ? await this.s3Servie.uploadFile(fileElement, "projects-crowd-fet/elements/")
                    : null;
                elementsSaving.push({
                    title: item.title,
                    imageId: fileElement ? dataFile.id : null,
                    itemId: item.id,
                });
            }
            for (let index = 0; index < data.rewards.length; index++) {
                const reward = data.rewards[index];
                const elementsId = reward.selectedOptions.split(",");
                const elementsForReward = elementsSaving
                    .filter((element) => elementsId.includes(element.itemId))
                    .map((eleme) => {
                    delete eleme.itemId;
                    return eleme;
                });
                delete reward.selectedOptions;
                await this.prisma.reward.create({
                    data: {
                        ...reward,
                        pledgedAmount: Number(reward.pledgedAmount),
                        availability: Number(reward.availability),
                        limitTime: new Date(reward.limitTime),
                        estimatedDelivery: new Date(reward.estimatedDelivery),
                        shipping: Boolean(reward.shipping),
                        projectId: project.id,
                        imageId: null,
                        elements: {
                            createMany: {
                                data: elementsForReward,
                            },
                        },
                    },
                });
            }
            return project;
        }
        catch (error) {
            console.error("Error creating project:", error);
        }
        finally {
            await this.prisma.$disconnect();
        }
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const take = Number(limit);
        const [projects, total] = await Promise.all([
            this.prisma.project.findMany({
                skip,
                take,
                include: { category: true, image: true },
            }),
            this.prisma.project.count(),
        ]);
        return {
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            projects: projects.map((project) => ({
                ...project,
                image: project.image.fileUrl,
                category: project.category.name,
            })),
        };
    }
    async findByStatus(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const take = Number(limit);
        const [projects, total] = await Promise.all([
            this.prisma.project.findMany({
                skip,
                take,
                include: { category: true, image: true },
                where: {
                    status: "pending",
                },
            }),
            this.prisma.project.count(),
        ]);
        return {
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            projects: projects.map((project) => ({
                ...project,
                image: project.image.fileUrl,
                category: project.category.name,
            })),
        };
    }
    isValidUUID(uuid) {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
    }
    async findById(id) {
        if (!this.isValidUUID(id)) {
            throw new Error("Invalid UUID format");
        }
        const project = await this.prisma.project.findUnique({
            include: {
                category: true,
                image: true,
                history: {
                    include: { projectHistory: true },
                },
                rewards: true
            },
            where: {
                id: id,
            },
        });
        const history = Array.isArray(project.history)
            ? project.history[0]
            : project.history;
        return {
            ...project,
            image: project.image.fileUrl,
            category: project.category.name,
            file: history.projectHistory,
        };
    }
    async getProjectDataForId(id) {
        console.log('entre');
        return await this.prisma.project.findUnique({
            include: { category: true, image: true, rewards: true, history: true },
            where: {
                id: id,
            },
        }).catch((error) => {
            console.log(error);
        });
    }
    async getProjectForId(id) {
        console.log('entre');
        return await this.prisma.project.findUnique({
            where: {
                id,
            },
        });
    }
    async updateStatus(id) {
        try {
            if (!this.isValidUUID(id)) {
                throw new Error("Invalid UUID format");
            }
            await this.prisma.project.update({
                where: { id },
                data: { status: "approved" },
            });
            return {
                data: "Proyecto aprobado",
            };
        }
        catch (error) {
            console.error(error);
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