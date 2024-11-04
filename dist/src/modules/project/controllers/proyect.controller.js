"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const proyect_dto_1 = require("../dto/proyect.dto");
const project_service_1 = require("../services/project.service");
let CommonController = class CommonController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async createProject(data) {
        return this.projectService.createProject(data);
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Post)('project'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene los programas academicos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proyect_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "createProject", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)('project'),
    (0, swagger_1.ApiTags)('Controlador de las opciones comunes'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], CommonController);
//# sourceMappingURL=proyect.controller.js.map