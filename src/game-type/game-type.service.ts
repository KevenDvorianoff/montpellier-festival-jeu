import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';
import { GameType} from './entities/game-type.entity'

@Injectable()
export class GameTypeService {

  constructor(@InjectRepository(GameType) private gameTypeRepository: Repository<GameType>) {}

  create(createGameTypeDto: CreateGameTypeDto) {
    return this.gameTypeRepository.save(createGameTypeDto);
  }

  findAll() {
    return this.gameTypeRepository.find();
  }

  async findOne(id: number) {
    const gameType = await this.gameTypeRepository.findOne(id);

    if(gameType){
      return gameType;
    }
    else {
      throw new NotFoundException(`No game type found with this id ${id}`)
    }
  }

  update(id: number, updateGameTypeDto: UpdateGameTypeDto) {
    return this.gameTypeRepository.update(id, updateGameTypeDto);
  }

  remove(id: number) {
    return this.gameTypeRepository.delete(id);
  } 
}
