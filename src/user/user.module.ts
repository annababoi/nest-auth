import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { JwtService } from "@nestjs/jwt";


@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserModule, UserService]
})
export class UserModule {}
