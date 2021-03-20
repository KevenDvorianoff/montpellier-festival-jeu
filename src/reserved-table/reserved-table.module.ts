import { Module } from '@nestjs/common';
import { ReservedTableService } from './reserved-table.service';
import { ReservedTableController } from './reserved-table.controller';
import { databaseAccessModule } from 'src/utils';

@Module({
  imports: [databaseAccessModule()],
  controllers: [ReservedTableController],
  providers: [ReservedTableService]
})
export class ReservedTableModule {}
