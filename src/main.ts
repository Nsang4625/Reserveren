import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configSwagger } from './infras/configs/api-docs.config';
import {session} from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configSwagger(app);
  app.useGlobalPipes(new ValidationPipe(
    { 
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }
  ));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();