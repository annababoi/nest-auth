import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user.model";
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      models: [User],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: join(__dirname, '..', 'client'),
    }),
    ServeStaticModule.forRoot({
      renderPath: '/success',
      rootPath: join(__dirname, '..', 'client/success'),
    }),
    ServeStaticModule.forRoot({
      renderPath: '/error',
      rootPath: join(__dirname, '..', 'client/success'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
