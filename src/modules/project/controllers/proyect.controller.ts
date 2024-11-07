
import { Body, Controller, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
import { IMulterFile } from 'src/types/multer';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
interface FilesProject  {
  file: IMulterFile
}
@Controller('project')
@ApiTags('Controlador de las opciones comunes')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Post('create-project')
  @ApiOperation({
    summary: 'Obtiene los programas academicos',
  })
  @UseInterceptors(
    AnyFilesInterceptor()
  )
  async createProject(
    @Body() data: CreateProjectDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
      })
  )
    files: any[],
  ) {
    console.log(files)
    return this.projectService.createProject(data, files);
  }
}
