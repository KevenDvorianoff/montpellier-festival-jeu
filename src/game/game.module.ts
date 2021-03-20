import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { databaseAccesModule } from 'src/utils';

@Module({
  imports: [databaseAccesModule()],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
