import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaymentController } from './controllers/payment.controller';
import { TransactionService } from './services/transaction.service';
import { MembershipService } from './services/menbership.service';
import { EventsGateway } from 'src/events/events.gateway';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../user/services/user.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { ProjectService } from '../project/services/project.service';
import { S3Service } from '../common/services/aws-s3.service';

@Module({
  imports: [AuthModule],
  controllers: [PaymentController],
  providers: [TransactionService, PrismaService, MembershipService, EventsGateway,ConfigService, ProjectService, S3Service, UserService],
})
export class PaymentsModule {}
