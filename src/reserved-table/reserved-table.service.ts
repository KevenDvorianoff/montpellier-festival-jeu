import { Injectable } from '@nestjs/common';
import { CreateReservedTableDto } from './dto/create-reserved-table.dto';
import { UpdateReservedTableDto } from './dto/update-reserved-table.dto';

@Injectable()
export class ReservedTableService {
  create(createReservedTableDto: CreateReservedTableDto) {
    return 'This action adds a new reservedTable';
  }

  findAll() {
    return `This action returns all reservedTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservedTable`;
  }

  update(id: number, updateReservedTableDto: UpdateReservedTableDto) {
    return `This action updates a #${id} reservedTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservedTable`;
  }
}
