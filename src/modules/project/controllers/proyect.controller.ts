
import { Body, Controller, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
import { IMulterFile } from 'src/types/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 } // Nombre del campo en el `FormData`
    ])
  )
  async createProject(
    @Body() data: CreateProjectDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
      })
  )
    files: FilesProject,
  ) {
    console.log(files)
    return this.projectService.createProject(data, files.file[0]);
  }
}
