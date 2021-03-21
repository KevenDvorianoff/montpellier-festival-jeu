import { Module } from '@nestjs/common';
import { ReservedGameService } from './reserved-game.service';
import { ReservedGameController } from './reserved-game.controller';
import { databaseAccessModule } from 'src/utils';

@Module({
  imports: [databaseAccessModule()],
  controllers: [ReservedGameController],
  providers: [ReservedGameService]
})
export class ReservedGameModule {}
