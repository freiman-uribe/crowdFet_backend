import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { ProjectModule } from './modules/project/project.module';
import { PaymentsModule } from './modules/payments/payment.module';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    PaymentsModule,
    ProjectModule,
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
