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
    return this.festivalRepository.createQueryBuilder('festival')
    .leftJoin('festival.reservations', 'reservations')
    .leftJoin('reservations.reservedGames', 'reservedGames')
    .leftJoin('reservedGames.game', 'game')
    .leftJoin('reservedGames.area', 'area')
    .leftJoin('game.gameType', 'gameType')
    .leftJoin('game.publisher', 'publisher')
    .where('festival.isActive = true')
    .select('game.id', 'id')
    .addSelect('game.name', 'name')
    .addSelect('game.notice', 'notice')
    .addSelect('game.duration', 'duration')
    .addSelect('game.minPlayers', 'minPlayers')
    .addSelect('game.maxPlayers', 'maxPlayers')
    .addSelect('game.minAge', 'minAge')
    .addSelect('game.maxAge', 'maxage')
    .addSelect('game.isPrototype', 'isPrototype')
    .addSelect('game.publisherId', 'publisherId')
    .addSelect('publisher.name', 'publisherName')
    .addSelect('reservedGames.areaId', 'areaId')
    .addSelect('area.label', 'areaName')
    .addSelect('gameType.label', 'gameType')
    .getRawMany();
  }

  update(id: number, updateFestivalDto: UpdateFestivalDto) {
    return this.festivalRepository.update(id,updateFestivalDto);
  }

  remove(id: number) {
    return this.festivalRepository.delete(id);
  }
}
