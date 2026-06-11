import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import { AppModule } from './app.module';
import { uploadConfig } from './config/upload.config';
import { GlobalExceptionFilter } from './middlewares/errorHandler.middleware';
import { ensureUploadDir } from './utils/fileUpload';

async function bootstrap() {
  ensureUploadDir();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use('/uploads', express.static(uploadConfig.uploadDir));

  app.getHttpAdapter().get('/api/health', (_req, res) => {
    res.json({ code: 0, message: 'ok', data: { service: 'safety-platform-backend' } });
  });

  await app.listen(Number(process.env.PORT ?? 3000), '0.0.0.0');
}

bootstrap();
