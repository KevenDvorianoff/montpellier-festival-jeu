import { Module } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { FestivalController } from './festival.controller';
import { databaseAccesModule } from 'src/utils';

@Module({
  imports: [databaseAccesModule()],
  controllers: [FestivalController],
  providers: [FestivalService]
})
export class FestivalModule {}
