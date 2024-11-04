import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsDate, Min, IsInt, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsUrl()
  video?: string;

  @IsNumber()
  @Min(0)
  fundingAmount: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  launchDate?: Date;

  @IsInt()
  @Min(1)
  campaignDuration: number;

  @IsString()
  @IsOptional()
  status?: string = 'pending'; // Valor por defecto

  @IsUUID()
  @IsNotEmpty()
  imageId: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  subCategoryId: string;
}
