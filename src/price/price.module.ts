import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { databaseAccesModule } from 'src/utils';

@Module({
  imports: [databaseAccesModule()],
  controllers: [PriceController],
  providers: [PriceService]
})
export class PriceModule {}
