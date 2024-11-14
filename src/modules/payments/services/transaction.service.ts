import { Injectable } from '@nestjs/common';
// import { TransactionEntity } from '../../entity/transaction.entity';
// import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { Transaction } from '../types/transaction';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import axios, { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { Project } from '@prisma/client';
import { STATUS_TRANSACTION } from 'src/constants/status';


@Injectable()
export class TransactionService {
  public reference: string = '';
  private providerIntegrity: string;
  private providerKey:string;
  private headers: (RawAxiosRequestHeaders) | AxiosHeaders;
  private mount:number;
  private quantity: number;
  private signature: string = '';
  private currency: string = 'COP'
  private _userId: string

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    
    // private transactionDao:TransactionDao
  ) {
    this.providerKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7'
    this.providerIntegrity = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
    this.headers = {
      Authorization: `Bearer ` + this.providerKey
    }
  }

  
  set userId (value: string) {
    this._userId = value
  }

  setMountsQuantity(mount: number, quantity: number) {
    this.mount = mount
    this.quantity = quantity
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    const result = await this.prisma.transactions.findUnique({
      where: { id },
      select: {
        id: true,
        reference: true,  // Equivalente a 'created_date' en tu código TypeORM
        mount: true,
        quantity: true,
        statusTransaction: true,  // En Prisma, los nombres de las columnas se definen en camelCase
      },
    });
  
    if (!result) return null;
  
    return new Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
  }

  async getTransactionForRerence(reference: string) {
    const result = await this.prisma.transactions.findUnique({
      where: { reference},
    });
  
    if (!result) return null;
  
    return result
  }

  updateTransaction(id: string, status: string) {
    return this.prisma.transactions.update({
      where: { id },
      data: { statusTransaction: status },
    });
  }
  

  async initReference(project: Project, mount: number): Promise<Transaction> {
    const lastReference = await this.prisma.transactions.findFirst({
      orderBy: {
        created_at: 'desc', // Asumiendo que tienes un campo 'createdAt' para la fecha de creación
      },
    });
    let newReferenceNumber: number;
    if (lastReference?.reference) {
      const lastNumber = parseInt(lastReference.reference.replace('FREEREFERENCE', ''), 10);
      newReferenceNumber = lastNumber + 1;
    } else {
      newReferenceNumber = 1;
    }
    const newReferenceStr = `FREEREFERENCE${newReferenceNumber.toString().padStart(8, '0')}`;

    return await this.createTransaction(newReferenceStr, project, mount)
  }

  async generateSignature (amount: number): Promise<string> {
    const encondedText = new TextEncoder().encode(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`);
    console.log(`${this.reference}${amount}${this.currency}${this.providerIntegrity}`, 'encondedText')
    const hashBuffer = await (crypto as any).subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    this.signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return this.signature
  }
 
  async createTransaction(reference: string, project: Project, mount: number): Promise<Transaction> {
    console.log(reference, 'reference')
    const result = await this.prisma.transactions.create({
      data: {
        updated_at: new Date(),
        created_at: new Date(),
        created_by: this._userId,
        modified_by: this._userId,
        projectId: project.id,
        userId: this._userId ? this._userId : null,
        amount_per_day: 0,//plan.amount_perday,
        equal_day: 0,//plan.equals_day,
        mount,//(plan.amount_perday * plan.equals_day) * 100, // Dividiendo el mount como lo haces en tu lógica actual
        quantity: 0,
        reference: reference,
        statusTransaction: STATUS_TRANSACTION.START, // Prisma usa camelCase para los campos
      },
    }).catch(er => {
      console.log(er)
      return null
    });
    // Retornamos una instancia de la clase Transaction
    return new Transaction(result.id, result.reference, result.statusTransaction, result.quantity);
  }

  async validTransaction(transactionId): Promise<any> {
    try {
      const { data: { data } } = await axios.get(`https://api-sandbox.co.uat.wompi.dev/v1/transactions/${transactionId}`,
        { headers: { ...this.headers } }
      )

      return data
    } catch(err) {
      console.error(err)
      throw new Error(err.response.data.error)
    }
  }
}

