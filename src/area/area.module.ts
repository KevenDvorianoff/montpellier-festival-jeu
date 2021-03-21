import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { databaseAccessModule } from 'src/utils';

@Module({
  imports: [databaseAccessModule()],
  controllers: [AreaController],
  providers: [AreaService]
})
export class AreaModule {}
