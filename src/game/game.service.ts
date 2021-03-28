import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameType } from 'src/game-type/entities/game-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(GameType) private gameTypeRepository: Repository<GameType>
    ) {}

  async create(createGameDto: CreateGameDto) {
    const { publisherId, gameTypeId, ...dto } = createGameDto;
    const publisher = await this.companyRepository.findOne(publisherId);
    const gameType = await this.gameTypeRepository.findOne(gameTypeId);
    if (publisher){
      if (gameType){
        return this.gameRepository.save({publisher, gameType, ...dto});
      }
      else {
        throw new BadRequestException();
      }
    }
    else {
        throw new BadRequestException();
      }
  }

  findAll() {
    return this.gameRepository.createQueryBuilder("game")
    .leftJoin("game.publisher", "publisher")
    .leftJoin("game.gameType", "gameType")
    .select('game.id', 'id')
    .addSelect('game.name', 'name')
    .addSelect('game.notice', 'notice')
    .addSelect('game.duration', 'duration')
    .addSelect('game.minPlayers', 'minPlayers')
    .addSelect('game.maxPlayers', 'maxPlayers')
    .addSelect('game.minAge', 'minAge')
    .addSelect('game.maxAge', 'maxAge')
    .addSelect('game.isPrototype', 'isPrototype')
    .addSelect('game.lastModification', 'lastModification')
    .addSelect('game.publisherId', 'publisherId')
    .addSelect('publisher.name', 'publisherName')
    .addSelect('gameType.label', 'gameType')
    .getRawMany()
  }

  findAllForCompany(id: number){


    return this.gameRepository.createQueryBuilder("game")
    .leftJoin("game.publisher", "publisher")
    .where("publisher.id = :id", {id: id})
    .getMany()
  }

  async findOne(id: number) {
    const game = await this.gameRepository.findOne(id);
    if (game) {
      return game;
    }
    else {
      throw new NotFoundException(`No game found with id ${id}`);
    }
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const { publisherId, gameTypeId, ...dto } = updateGameDto;
    const publisher = await this.companyRepository.findOne(publisherId);
    const gameType = await this.gameTypeRepository.findOne(gameTypeId);
    if (publisher){
      if (gameType){
        return this.gameRepository.update(id, {publisher, gameType, ...dto});
      }
      else {
        throw new BadRequestException();
      }
    }
    else {
        throw new BadRequestException();
      }
  }

  remove(id: number) {
    return this.gameRepository.delete(id);
  }
}
