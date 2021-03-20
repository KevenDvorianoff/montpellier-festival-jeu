import { Module } from '@nestjs/common';
import { ReservedTableService } from './reserved-table.service';
import { ReservedTableController } from './reserved-table.controller';
import { databaseAccesModule } from 'src/utils';

@Module({
  imports: [databaseAccesModule()],
  controllers: [ReservedTableController],
  providers: [ReservedTableService]
})
export class ReservedTableModule {}
