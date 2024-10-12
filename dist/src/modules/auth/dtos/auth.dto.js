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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCreateUserDto = exports.AuthDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AuthDto {
}
exports.AuthDto = AuthDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ description: 'Email del usuario', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Contraseña del usuario', example: 'holomundo' }),
    __metadata("design:type", String)
], AuthDto.prototype, "password", void 0);
class AuthCreateUserDto {
}
exports.AuthCreateUserDto = AuthCreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Documento del usuario', example: '10000000000' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "document", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Nombre completo del usuario', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Apellidos completo del usuario', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ description: 'Email del usuario', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Contraseña del usuario', example: 'holomundo' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Código de registro universidad', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "code_student", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Tipo de sangre', example: 'john_doe@gmail.com' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "rh", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: 'Código del programa', example: '' }),
    __metadata("design:type", String)
], AuthCreateUserDto.prototype, "code_program", void 0);
//# sourceMappingURL=auth.dto.js.map