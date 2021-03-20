import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { databaseAccesModule } from 'src/utils';

@Module({
  imports: [databaseAccesModule()],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
