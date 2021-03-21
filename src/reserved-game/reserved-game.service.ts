import { Injectable } from '@nestjs/common';
import { CreateReservedGameDto } from './dto/create-reserved-game.dto';
import { UpdateReservedGameDto } from './dto/update-reserved-game.dto';

@Injectable()
export class ReservedGameService {
  create(createReservedGameDto: CreateReservedGameDto) {
    return 'This action adds a new reservedGame';
  }

  findAll() {
    return `This action returns all reservedGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservedGame`;
  }

  update(id: number, updateReservedGameDto: UpdateReservedGameDto) {
    return `This action updates a #${id} reservedGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservedGame`;
  }
}
