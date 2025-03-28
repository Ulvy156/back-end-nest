import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const ip = configService.get<string>('IP', 'localhost'); // Default to 'localhost'
  const port = configService.get<number>('PORT', 3000);

  app.useLogger(['log', 'warn', 'error']);
  // Enable CORS for your front-end origin
  app.enableCors({
    origin: '*', // Replace with your Vue.js app URL
    methods: 'GET,POST,PUT,DELETE', // Allow the necessary methods
    allowedHeaders: '*', // Allow necessary headers
  });
  await app.listen(port, ip, () => {
    console.log(`Application is running on: http://${ip}:${port}`);
  });
}
void bootstrap();
