import { ConfigService } from '@nestjs/config';
import { IMulterFile } from 'src/types/multer';
import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class S3Service {
    private configService;
    private prisma;
    private s3Client;
    private readonly bucketName;
    private readonly region;
    constructor(configService: ConfigService, prisma: PrismaService);
    uploadFile(file: IMulterFile, folder: string): Promise<{
        id: string;
        fileName: string;
        fileType: string;
        fileSize: number;
        fileUrl: string;
        uploadedAt: Date;
    }>;
}
