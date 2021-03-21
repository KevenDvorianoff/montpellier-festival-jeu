import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';

@Injectable()
export class AreaService {
  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>) {}
  create(createAreaDto: CreateAreaDto) {
    return this.areaRepository.save(createAreaDto);
  }

  findAll() {
    return this.areaRepository.find();
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findOne(id);
    if (area) {
      return area;
    }
    else {
      throw new NotFoundException(`No account found with id ${id}`);
    }
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return this.areaRepository.update(id, updateAreaDto);
  }

  remove(id: number) {
    return this.areaRepository.delete(id);
  }
}
