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

  @Get('area/:id')
  findGamesForAreas(@Param('id') id: string) {
    return this.reservedGameService.findGamesForAreas(+id);
  }

  @Get('/company')
  findAllEditeurs(){
    return this.reservedGameService.findAllEditeurs();
  }

  @Get('company/:id')
  findAllForCompany(@Param('id') id: string) {
    return this.reservedGameService.findAllForCompany(+id);
  }

  @Get(':idReservation/:idGame')
  findOne(@Param('idReservation') idReservation: string, @Param('idGame') idGame: string) {
    return this.reservedGameService.findOne(+idReservation, +idGame);
  }

  @Patch(':idReservation/:idGame')
  update(@Param('idReservation') idReservation: string, @Param('idGame') idGame: string, @Body() updateReservedGameDto: UpdateReservedGameDto) {
    return this.reservedGameService.update(+idReservation, +idGame, updateReservedGameDto);
  }

  @Delete(':idReservation/:idGame')
  remove(@Param('idReservation') idReservation: string, @Param('idGame') idGame: string) {
    return this.reservedGameService.remove(+idReservation, +idGame);
  }
}
