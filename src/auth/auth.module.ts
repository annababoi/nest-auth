import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from "./auth.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Token } from "./token.model";

require("dotenv").config();

@Module({
  imports: [
    SequelizeModule.forFeature([Token]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_WORD,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}