import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservedTableService } from './reserved-table.service';
import { CreateReservedTableDto } from './dto/create-reserved-table.dto';
import { UpdateReservedTableDto } from './dto/update-reserved-table.dto';

@Controller('reserved-table')
export class ReservedTableController {
  constructor(private readonly reservedTableService: ReservedTableService) {}

  @Post()
  create(@Body() createReservedTableDto: CreateReservedTableDto) {
    return this.reservedTableService.create(createReservedTableDto);
  }

  @Get()
  findAll() {
    return this.reservedTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservedTableDto: UpdateReservedTableDto) {
    return this.reservedTableService.update(+id, updateReservedTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedTableService.remove(+id);
  }
}
