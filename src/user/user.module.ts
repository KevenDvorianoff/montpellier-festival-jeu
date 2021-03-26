import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseAccessModule } from 'src/utils';
import { PasswordService } from './password.service';

@Module({
  imports: [databaseAccessModule()],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService]
})
export class UserModule {}
