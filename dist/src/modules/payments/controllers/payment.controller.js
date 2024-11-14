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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("../services/transaction.service");
const events_gateway_1 = require("../../../events/events.gateway");
const auth_service_1 = require("../../auth/services/auth.service");
const status_1 = require("../../../constants/status");
const project_service_1 = require("../../project/services/project.service");
const user_service_1 = require("../../user/services/user.service");
let PaymentController = class PaymentController {
    constructor(transactionService, eventsGateway, authService, projectService, userService) {
        this.transactionService = transactionService;
        this.eventsGateway = eventsGateway;
        this.authService = authService;
        this.projectService = projectService;
        this.userService = userService;
    }
    async getPlansEstudents(req) {
    }
    async checkoutPayment(req, queryParams) {
        console.log(queryParams);
        const validDataPayment = await this.transactionService.validTransaction(queryParams.id);
        if (validDataPayment && validDataPayment.status === status_1.STATUS_TRANSACTION.APPROVED) {
            const transaction = await this.transactionService.getTransactionForRerence(validDataPayment.reference);
            if (transaction) {
                await this.transactionService.updateTransaction(transaction.id, status_1.STATUS_TRANSACTION.APPROVED);
                this.eventsGateway.server.emit('message', 'UPDATE_PLAN');
            }
            console.log(transaction);
        }
        return true;
    }
    async create(req, body, projectId) {
        const user = await this.userService.createOrUpdateUser({
            full_name: body.name,
            email: body.email,
            last_name: body.last_name,
            password: 'Hol!mundo',
        });
        this.transactionService.userId = user.id;
        const planData = await this.projectService.getProjectForId(projectId);
        const totalPayment = Number(body.amount) * 100;
        const newTransaction = await this.transactionService.initReference(planData, totalPayment);
        try {
            this.transactionService.reference = newTransaction.reference;
            const signature = await this.transactionService.generateSignature(totalPayment);
            return {
                reference: newTransaction.reference,
                signature,
                totalPayment
            };
        }
        catch (error) {
            console.log(error);
            return new common_1.BadRequestException({ status: status_1.STATUS_TRANSACTION.REJECTED, 'message': 'Payment rejected' });
        }
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)('/get-plans'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPlansEstudents", null);
__decorate([
    (0, common_1.Get)('/checkout'),
    (0, common_1.UseGuards)(),
    (0, common_1.SetMetadata)('isPublic', true),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkoutPayment", null);
__decorate([
    (0, common_1.Post)('/create-payment/:projectId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, swagger_1.ApiTags)('Creacion de pago'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        events_gateway_1.EventsGateway,
        auth_service_1.AuthService,
        project_service_1.ProjectService,
        user_service_1.UserService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map