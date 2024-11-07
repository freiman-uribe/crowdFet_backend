import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsDate, Min, IsInt, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;


  @IsOptional()
  @IsDate()
  @Type(() => Date)
  launchDate?: Date;

  @IsString()
  durationCampaign: Date;

  @IsString()
  @IsOptional()
  status?: string = 'pending'; // Valor por defecto

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  subCategoryId: string;


  @IsNotEmpty()
  montoMeta: number

  dateLaunch: Date;
  deparment: string;

  municipality: string;
}
