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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const transaction_1 = require("../types/transaction");
const prisma_service_1 = require("../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const axios_1 = require("axios");
const status_1 = require("../../../constants/status");
let TransactionService = class TransactionService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.reference = '';
        this.signature = '';
        this.currency = 'COP';
        this.providerKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
        this.providerIntegrity = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
        this.headers = {
            Authorization: `Bearer ` + this.providerKey
        };
    }
    set userId(value) {
        this._userId = value;
    }
    setMountsQuantity(mount, quantity) {
        this.mount = mount;
        this.quantity = quantity;
    }
    async getTransaction(id) {
        const result = await this.prisma.transactions.findUnique({
            where: { id },
            select: {
                id: true,
                reference: true,
                mount: true,
                quantity: true,
                statusTransaction: true,
            },
        });
        if (!result)
            return null;
        return new transaction_1.Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
    }
    async getTransactionForRerence(reference) {
        const result = await this.prisma.transactions.findUnique({
            where: { reference },
        });
        if (!result)
            return null;
        return result;
    }
    updateTransaction(id, status) {
        return this.prisma.transactions.update({
            where: { id },
            data: { statusTransaction: status },
        });
    }
    async initReference(project, mount) {
        const lastReference = await this.prisma.transactions.findFirst({
            orderBy: {
                created_at: 'desc',
            },
        });
        let newReferenceNumber;
        if (lastReference?.reference) {
            const lastNumber = parseInt(lastReference.reference.replace('FREEREFERENCE', ''), 10);
            newReferenceNumber = lastNumber + 1;
        }
        else {
            newReferenceNumber = 1;
        }
        const newReferenceStr = `FREEREFERENCE${newReferenceNumber.toString().padStart(8, '0')}`;
        return await this.createTransaction(newReferenceStr, project, mount);
    }
    async generateSignature(amount) {
        const encondedText = new TextEncoder().encode(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`);
        console.log(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`, 'encondedText');
        const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        this.signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        return this.signature;
    }
    async createTransaction(reference, project, mount) {
        console.log(reference, 'reference');
        const result = await this.prisma.transactions.create({
            data: {
                updated_at: new Date(),
                created_at: new Date(),
                created_by: this._userId,
                modified_by: this._userId,
                projectId: project.id,
                userId: this._userId ? this._userId : null,
                amount_per_day: 0,
                equal_day: 0,
                mount,
                quantity: 0,
                reference: reference,
                statusTransaction: status_1.STATUS_TRANSACTION.START,
            },
        }).catch(er => {
            console.log(er);
            return null;
        });
        return new transaction_1.Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
    }
    async validTransaction(transactionId) {
        try {
            const { data: { data } } = await axios_1.default.get(`https://api-sandbox.co.uat.wompi.dev/v1/transactions/${transactionId}`, { headers: { ...this.headers } });
            return data;
        }
        catch (err) {
            console.error(err);
            throw new Error(err.response.data.error);
        }
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map