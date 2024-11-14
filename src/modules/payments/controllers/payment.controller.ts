

import { BadRequestException, Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Query, Request, SetMetadata, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { IMulterFile } from 'src/types/multer';
import { TransactionService } from '../services/transaction.service';
import { EventsGateway } from 'src/events/events.gateway';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { STATUS_TRANSACTION } from 'src/constants/status';
import { ProjectService } from 'src/modules/project/services/project.service';
import { UserService } from 'src/modules/user/services/user.service';

export interface FilesDataCar {
  tarjeta_de_propietario: IMulterFile[]
  seguro: IMulterFile[]
  seguro_todo_riesgo: IMulterFile[]
  tecnomecanica: IMulterFile[]
}

@Controller('payment')
@ApiTags('Creacion de pago')
export class PaymentController {

  constructor(
    private readonly transactionService: TransactionService,
    private readonly eventsGateway: EventsGateway,
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService
  ) {}

  @Get('/get-plans')
  async getPlansEstudents(@Request() req) {
    // return this.planService.findAll()
  }

  @Get('/checkout')
  @UseGuards()
  @SetMetadata('isPublic', true)  // Marca la ruta como pública
  async checkoutPayment(@Request() req, @Query() queryParams) {
    console.log(queryParams)
    const validDataPayment = await this.transactionService.validTransaction(queryParams.id)
    if (validDataPayment && validDataPayment.status === STATUS_TRANSACTION.APPROVED) {
      const transaction = await this.transactionService.getTransactionForRerence(validDataPayment.reference)

      if (transaction) {
        await this.transactionService.updateTransaction(transaction.id, STATUS_TRANSACTION.APPROVED)
        // await this.planService.createPlanForEstudent(transaction.user_id, transaction)
        this.eventsGateway.server.emit('message', 'UPDATE_PLAN');
      }
      console.log(transaction)
    }
    return true
  }

  @Post('/create-payment/:projectId')  async create(
    @Request() req,
    @Body() body: any,
    @Param('projectId') projectId: string
  ) {
    const user = await this.userService.createOrUpdateUser({
      full_name: body.name,
      email: body.email,
      last_name: body.last_name,
      password: 'Hol!mundo',
    })
    this.transactionService.userId = user.id
    const planData = await this.projectService.getProjectForId(projectId)
    const totalPayment = Number(body.amount) * 100 
    const newTransaction = await this.transactionService.initReference(planData, totalPayment)

    try {
      this.transactionService.reference = newTransaction.reference
  
      const signature = await this.transactionService.generateSignature(totalPayment)
      return {
        reference: newTransaction.reference,
        signature,
        totalPayment
      }
    } catch (error) {
      console.log(error)
      return new BadRequestException({ status: STATUS_TRANSACTION.REJECTED, 'message': 'Payment rejected' })
    }
  }
}
