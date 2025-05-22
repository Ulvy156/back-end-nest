import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Load .env file
  const configService = app.get(ConfigService);
  const ip = configService.get<string>('IP', 'localhost'); // Default to 'localhost'
  const port = parseInt(configService.get<string>('PORT', '3000'));
  // front-end url
  const frontEndUrl = configService.get<string>(
    'FRONT_END_URL',
    'http://localhost:5173',
  );
  //log request from user
  app.useLogger(['log', 'warn', 'error']);
  // Enable CORS for your front-end origin
  app.enableCors({
    origin: frontEndUrl,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: '*',
  });
  // Enables automatic type conversion
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //start Nest App
  await app.listen(port, ip, () => {
    console.log(`Application is running on: http://${ip}:${port}`);
  });
}
void bootstrap();
