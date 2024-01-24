import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { BrandModule } from './adapters/brand/brand.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './infras/filters/global-exception.filter';
import {AuthModule} from "./adapters/auth/auth.module";
import { HotelModule } from './adapters/hotel/hotel.module';
import { RoomModule } from './adapters/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/local.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BrandModule,
    AuthModule,
    HotelModule,
    RoomModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    }
  ],
})
export class AppModule { }
