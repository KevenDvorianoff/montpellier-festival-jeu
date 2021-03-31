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
    .leftJoin('reservations.company', 'exhibitor')
    .leftJoin('reservedGames.game', 'game')
    .leftJoin('reservedGames.area', 'area')
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
    .addSelect('game.gameType', 'gameType')
    .addSelect('publisher.name', 'publisherName')
    .addSelect('exhibitor.name', 'exhibitorName')
    .addSelect('area.label', 'areaName')
    .addSelect('reservedGames.exposed', 'exposed')
    .addSelect('reservedGames.donation', 'donation')
    .addSelect('reservedGames.tombola', 'tombola')
    .addSelect('reservedGames.receiveDate', 'receiveDate')
    .addSelect('reservedGames.needReturn', 'needReturn')
    .addSelect('reservedGames.tableCount', 'tableCount')
    .getRawMany();
  }

  findPublishersForCurrentFestival() {
    return this.festivalRepository.createQueryBuilder('festival')
    .leftJoin('festival.reservations', 'reservations')
    .leftJoin('reservations.reservedGames', 'reservedGames')
    .leftJoin('reservedGames.game', 'game')
    .leftJoin('game.publisher', 'publisher')
    .where('festival.isActive = true')
    .select('publisher.id', 'id')
    .addSelect('publisher.name', 'name')
    .addSelect('publisher.address', 'address')
    .distinct(true)
    .getRawMany();
  }

  findAreasForCurrentFestival() {
    return this.festivalRepository.createQueryBuilder('festival')
    .leftJoin('festival.areas', 'areas')
    .where('festival.isActive = true')
    .select('areas.id', 'id')
    .addSelect('areas.label', 'label')
    .getRawMany();
  }

  async update(id: number, updateFestivalDto: UpdateFestivalDto) {
    const result = await this.festivalRepository.update(id,updateFestivalDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.festivalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
