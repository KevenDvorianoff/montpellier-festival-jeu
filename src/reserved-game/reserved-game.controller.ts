import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservedGameService } from './reserved-game.service';
import { CreateReservedGameDto } from './dto/create-reserved-game.dto';
import { UpdateReservedGameDto } from './dto/update-reserved-game.dto';

@Controller('reserved-game')
export class ReservedGameController {
  constructor(private readonly reservedGameService: ReservedGameService) {}

  @Post()
  create(@Body() createReservedGameDto: CreateReservedGameDto) {
    return this.reservedGameService.create(createReservedGameDto);
  }

  @Get()
  findAll() {
    return this.reservedGameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservedGameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservedGameDto: UpdateReservedGameDto) {
    return this.reservedGameService.update(+id, updateReservedGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservedGameService.remove(+id);
  }
}
