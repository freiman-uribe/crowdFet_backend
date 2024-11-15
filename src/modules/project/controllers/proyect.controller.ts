
import { Body, Controller, ParseFilePipe, Get, Post, Query, UploadedFiles, UseInterceptors, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
import { IMulterFile } from 'src/types/multer';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { Project } from "@prisma/client";
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

interface FilesProject  {
  file: IMulterFile
}
@Controller("project")
@ApiTags("Controlador de las opciones comunes")
// @UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post("create-project")
  @ApiOperation({
    summary: "Obtiene los programas academicos",
  })
  @UseInterceptors(AnyFilesInterceptor())
  async createProject(
    @Body() data: CreateProjectDto,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
      })
    )
    files: any[]
  ) {
    console.log(files);
    return this.projectService.createProject(data, files);
  }

  @Get()
  @ApiOperation({
    summary: "Lista todos los proyectos",
  })
  async getProjects(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.projectService.findAll(page, limit);
  }

  @Get("list")
  @ApiOperation({
    summary: "Lista todos los proyectos",
  })
  async getListProjects(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.projectService.findByStatus(page, limit);
  }

  @Get("listByUser")
  @ApiOperation({
    summary: "Lista todos los proyectos",
  })
  async getListProjectsUser(@Query("id") id, @Query("page") page = 1, @Query("limit") limit = 10) {
    return this.projectService.findByUser(id, page, limit);
  }

  @Get("listByInversor")
  @ApiOperation({
    summary: "Lista todos los proyectos",
  })
  async getListProjectsInversor(@Query("id") id, @Query("page") page = 1, @Query("limit") limit = 10) {
    return this.projectService.findByiInversor(id, page, limit);
  }

   @Get("listInversores")
  @ApiOperation({
    summary: "Lista todos los proyectos",
  })
  async getListProjectsInversores(@Query("id") id, @Query("page") page = 1, @Query("limit") limit = 10) {
    return this.projectService.findInversores(id, page, limit);
  }

  @Get("project")
  @ApiOperation({
    summary: "Proyecto por id",
  })
  async getProjectId(@Query("id") id) {
    return this.projectService.findById(id);
  }

  @Get("get-project/:id")
  async getProject(@Param("id") id: string) {
    return this.projectService.getProjectDataForId(id);
  }

  @Get("active")
  @ApiOperation({
    summary: "Proyecto por id",
  })
  async activeProject(@Query("id") id) {
    return this.projectService.updateStatus(id);
  }
}
