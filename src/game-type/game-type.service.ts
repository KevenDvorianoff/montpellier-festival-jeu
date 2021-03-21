import { Injectable } from '@nestjs/common';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';

@Injectable()
export class GameTypeService {
  create(createGameTypeDto: CreateGameTypeDto) {
    return 'This action adds a new gameType';
  }

  findAll() {
    return `This action returns all gameType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameType`;
  }

  update(id: number, updateGameTypeDto: UpdateGameTypeDto) {
    return `This action updates a #${id} gameType`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameType`;
  }
}
