import { Module } from '@nestjs/common';
import { GameTypeService } from './game-type.service';
import { GameTypeController } from './game-type.controller';
import { databaseAccessModule } from 'src/utils';

@Module({
  imports: [databaseAccessModule()],
  controllers: [GameTypeController],
  providers: [GameTypeService]
})
export class GameTypeModule {}
