import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FestivalService } from './festival.service';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';

@Controller('festival')
export class FestivalController {
  constructor(private readonly festivalService: FestivalService) {}

  @Post()
  create(@Body() createFestivalDto: CreateFestivalDto) {
    return this.festivalService.create(createFestivalDto);
  }

  @Get()
  findAll() {
    return this.festivalService.findAll();
  }
  
  @Get('current/reserved-games')
  findGamesForCurrentFestival() {
    return this.festivalService.findGamesForCurrentFestival();
  }

  @Get('current/publishers')
  findPublishersForCurrentFestival() {
    return this.festivalService.findPublishersForCurrentFestival();
  }

  @Get('current/areas')
  findAreasForCurrentFestival() {
    return this.festivalService.findAreasForCurrentFestival();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.festivalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFestivalDto: UpdateFestivalDto) {
    return this.festivalService.update(+id, updateFestivalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.festivalService.remove(+id);
  }
}
