import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Company) private companyRepository: Repository<Company>
    ) {}

  async create(createGameDto: CreateGameDto) {
    const { publisherId, ...dto } = createGameDto;
    const publisher = await this.companyRepository.findOne(publisherId);
    if (publisher){
        return this.gameRepository.save({publisher, ...dto});
    }
    else {
        throw new BadRequestException();
      }
  }

  findAll() {
    return this.gameRepository.createQueryBuilder("game")
    .leftJoin("game.publisher", "publisher")
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
    .addSelect('game.gameType', 'gameType')
    .addSelect('publisher.name', 'publisherName')
    .getRawMany()
  }

  findAllGameType() {
    return this.gameRepository.createQueryBuilder("game")
    .select("DISTINCT game.gameType", "gameType")
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
    const { publisherId, ...dto } = updateGameDto;
    const publisher = await this.companyRepository.findOne(publisherId);
    if (publisher){
        return this.gameRepository.update(id, {publisher, ...dto});
    }
    else {
        throw new BadRequestException();
      }
  }

  async remove(id: number) {
    const result = await this.gameRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
