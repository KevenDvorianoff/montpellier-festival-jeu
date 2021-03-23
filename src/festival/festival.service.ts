import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { UpdateFestivalDto } from './dto/update-festival.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from './entities/festival.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FestivalService {

  constructor(@InjectRepository(Festival) private festivalRepository: Repository<Festival>) {}
  
  create(createFestivalDto: CreateFestivalDto) {
    return this.festivalRepository.save(createFestivalDto);
  }

  findAll() {
    return this.festivalRepository.find();
  }

  async findOne(id: number) {
    const festival = await this.festivalRepository.findOne(id);
    if (festival) {
      return festival;
    }
    else {
      throw new NotFoundException(`No festival found with id ${id}`);
    }
  }

  findGamesForCurrentFestival() {
    return this.festivalRepository.findOne({
      where : {
        isActive: true
      },
      relations : [
        'reservations',
        'reservations.reservedGames',
        'reservations.reservedGames.game'
      ]
    })
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return this.festivalRepository.update(id,updateFestivalDto);
  }

  remove(id: number) {
    return this.festivalRepository.delete(id);
  }
}
