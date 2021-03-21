import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { databaseAccessModule } from 'src/utils';

@Module({
  imports: [databaseAccessModule()],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
