import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as qs from 'qs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Override Express query parser
  (app.getHttpAdapter().getInstance() as express.Express).set(
    'query parser',
    (str) => qs.parse(str),
  );
  // Load .env properties
  const ip = process.env.IP ?? 'localhost';
  const port = parseInt(process.env.PORT ?? '3000');
  // Enable cookie parsing
  app.use(cookieParser());
  //log request from user
  app.useLogger(['log', 'warn', 'error']);

  // Enable CORS for your front-end origin
  app.enableCors({
    origin: process.env.FRONT_END_URL,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });

  // Enables automatic type conversion
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform JSON data to DTO types
      whitelist: true, // Strip non-DTO fields
      forbidNonWhitelisted: true, // Reject requests with extra fields
      disableErrorMessages: false, // Ensure errors are returned
    }),
  );

  //start Nest App
  await app.listen(port, ip, () => {
    console.log(`Application is running on: http://${ip}:${port}`);
  });
}
void bootstrap();
