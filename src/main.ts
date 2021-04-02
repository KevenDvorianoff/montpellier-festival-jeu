import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    transform: true,
    skipMissingProperties: false,
  }));

  const config = app.get(ConfigService);

  app.enableCors();
  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
