"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const payment_controller_1 = require("./controllers/payment.controller");
const transaction_service_1 = require("./services/transaction.service");
const menbership_service_1 = require("./services/menbership.service");
const events_gateway_1 = require("../../events/events.gateway");
const user_service_1 = require("../user/services/user.service");
const auth_module_1 = require("../auth/auth.module");
const config_1 = require("@nestjs/config");
const project_service_1 = require("../project/services/project.service");
const aws_s3_service_1 = require("../common/services/aws-s3.service");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [payment_controller_1.PaymentController],
        providers: [transaction_service_1.TransactionService, prisma_service_1.PrismaService, menbership_service_1.MembershipService, events_gateway_1.EventsGateway, config_1.ConfigService, project_service_1.ProjectService, aws_s3_service_1.S3Service, user_service_1.UserService],
    })
], PaymentsModule);
//# sourceMappingURL=payment.module.js.map