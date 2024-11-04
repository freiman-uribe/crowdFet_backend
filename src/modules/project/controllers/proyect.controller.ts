
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';

@Controller('project')
@ApiTags('Controlador de las opciones comunes')
export class CommonController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Post('project')
  @ApiOperation({
    summary: 'Obtiene los programas academicos',
  })
  async createProject(@Body() data: CreateProjectDto) {
    return this.projectService.createProject(data);
  }
}
