import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from './app.module';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    transform: true,
    skipMissingProperties: false,
  }));

  const config = app.get(ConfigService);

  const userRepository: Repository<Account> = app.get(getRepositoryToken(User));
  const userService = app.get(UserService);
  const userCounts = await userRepository.count();
  if (userCounts === 0) {
    await userService.create({
      isAdmin: true,
      username: 'admin',
      password: 'admin'
    });
  }

  app.enableCors();
  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
