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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let S3Service = class S3Service {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.region = 'us-east-2';
        this.s3Client = new client_s3_1.S3Client({
            region: this.region,
            credentials: {
                accessKeyId: configService.get('AWS_ACCESS_KEY'),
                secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
        this.bucketName = 'bus-fet';
    }
    async uploadFile(file, folder) {
        const fileKey = `${folder}${Date.now()}-${file.originalname}`;
        const uploadParams = {
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        await this.s3Client.send(command);
        const fileUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileKey}`;
        const createFileDto = {
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            fileUrl,
        };
        const savedFile = await this.prisma.file.create({ data: createFileDto });
        return savedFile;
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_service_1.PrismaService])
], S3Service);
//# sourceMappingURL=aws-s3.service.js.map