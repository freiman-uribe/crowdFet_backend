import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config'; 
import { IMulterFile } from 'src/types/multer';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string = 'us-east-2';

  constructor(private configService: ConfigService, private prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = 'bus-fet';
  }

  async uploadFile(file: IMulterFile, folder: string) {
    const fileKey = `${folder}${Date.now()}-${file.originalname}`
    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);
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
}
