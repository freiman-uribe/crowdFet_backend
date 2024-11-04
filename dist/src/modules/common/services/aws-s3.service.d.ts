import { ConfigService } from '@nestjs/config';
import { IMulterFile } from 'src/types/multer';
export declare class S3Service {
    private configService;
    private s3Client;
    private readonly bucketName;
    private readonly region;
    constructor(configService: ConfigService);
    uploadFile(file: IMulterFile, folder: string): Promise<any>;
}
