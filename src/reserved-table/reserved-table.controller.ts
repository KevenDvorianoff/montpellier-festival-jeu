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

  @Get(':idPrice/:idReservation')
  findOne(@Param('idPrice') idPrice: string, @Param('idReservation') idReservation: string) {
    return this.reservedTableService.findOne(+idPrice, +idReservation);
  }

  @Patch(':idPrice/:idReservation')
  update(@Param('idPrice') idPrice: string, @Param('idReservation') idReservation: string, @Body() updateReservedTableDto: UpdateReservedTableDto) {
    return this.reservedTableService.update(+idPrice, +idReservation, updateReservedTableDto);
  }

  @Delete(':idPrice/:idReservation')
  remove(@Param('idPrice') idPrice: string, @Param('idReservation') idReservation: string) {
    return this.reservedTableService.remove(+idPrice, +idReservation);
  }
}
