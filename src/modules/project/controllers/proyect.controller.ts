
import { Body, Controller, ParseFilePipe, Get, Post, Query, UploadedFiles, UseInterceptors, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/proyect.dto';
import { ProjectService } from '../services/project.service';
import { IMulterFile } from 'src/types/multer';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { Project } from "@prisma/client";

interface FilesProject  {
  file: IMulterFile
}
@Controller("project")
@ApiTags("Controlador de las opciones comunes")
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

  @Get("project")
  @ApiOperation({
    summary: "Proyecto por id",
  })
  async getProjectId(@Query("id") id ) {
    console.log("id", id);
    
    return this.projectService.findById(id);
  }


  @Get("get-project/:id")
  async getProject(@Param("id") id:string) {
    return this.projectService.getProjectDataForId(id);
  }
}
