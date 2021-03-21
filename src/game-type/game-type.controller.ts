import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameTypeService } from './game-type.service';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';

@Controller('game-type')
export class GameTypeController {
  constructor(private readonly gameTypeService: GameTypeService) {}

  @Post()
  create(@Body() createGameTypeDto: CreateGameTypeDto) {
    return this.gameTypeService.create(createGameTypeDto);
  }

  @Get()
  findAll() {
    return this.gameTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameTypeDto: UpdateGameTypeDto) {
    return this.gameTypeService.update(+id, updateGameTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameTypeService.remove(+id);
  }
}
