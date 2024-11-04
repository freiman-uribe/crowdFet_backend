import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { PrismaService } from "../prisma/prisma.service";


@Module({
  imports: [],
  controllers: [],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}