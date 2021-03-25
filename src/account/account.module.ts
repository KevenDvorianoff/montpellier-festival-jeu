import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { databaseAccessModule } from 'src/utils';
import { PasswordService } from './password.service';

@Module({
  imports: [databaseAccessModule()],
  controllers: [AccountController],
  providers: [AccountService, PasswordService]
})
export class AccountModule {}
