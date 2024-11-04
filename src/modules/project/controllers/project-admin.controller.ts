
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';

@Controller('project-admin')
@ApiTags('Controlador de las opciones comunes')
export class ProjectAdminController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Post('update-state/:id')
  @ApiOperation({
    summary: 'Actualiza el estado de un proyecto',
  })
  async updateStatusProject(
    @Param('id') id: string,
    @Body() data: CreateProjectDto
){
    return this.projectService.createProject(data);
  }
}
