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
const program_academic_service_1 = require("../services/program-academic.service");
const common_service_1 = require("../services/common.service");
let CommonController = class CommonController {
    constructor(programAcademic, commonService) {
        this.programAcademic = programAcademic;
        this.commonService = commonService;
    }
    async getProgramsAcademics() {
        return this.programAcademic.getProgramsAcademics();
    }
    async getListItemForParent(codes) {
        return this.commonService.getListItemForCodesParents(codes);
    }
    async getListItemForItem(id) {
        return this.commonService.getListItemFormParent(id);
    }
};
exports.CommonController = CommonController;
__decorate([
    (0, common_1.Get)('programs'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene los programas academicos',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "getProgramsAcademics", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Trae listas genericas de la base de datos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Exito. Devuelve un array de listas de elementos padres con sus hijos',
    }),
    (0, common_1.Get)('list-types'),
    __param(0, (0, common_1.Query)('codes', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "getListItemForParent", null);
__decorate([
    (0, common_1.Get)('list-item'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "getListItemForItem", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)('common'),
    (0, swagger_1.ApiTags)('Controlador de las opciones comunes'),
    __metadata("design:paramtypes", [program_academic_service_1.ProgramAcademicService,
        common_service_1.CommonService])
], CommonController);
//# sourceMappingURL=common.controller.js.map