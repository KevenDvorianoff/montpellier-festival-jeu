import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { Festival } from 'src/festival/entities/festival.entity';

@Injectable()
export class AreaService {

  constructor(
    @InjectRepository(Area) private areaRepository: Repository<Area>,
    @InjectRepository(Festival) private festivalRepository: Repository<Festival>
    ) {}

  async create(createAreaDto: CreateAreaDto) {
    const { festivalId, ...dto } = createAreaDto;
    const festival = await this.festivalRepository.findOne(festivalId);
    if (festival) {
      return this.areaRepository.save({ festival, ...dto });
    }
    else {
      throw new BadRequestException();
    }
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
      throw new NotFoundException(`No area found with id ${id}`);
    }
  }

  async update(id: number, updateAreaDto: UpdateAreaDto) {
    const result = await this.areaRepository.update(id, updateAreaDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.areaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  findGamesForArea(id:number) {
    return this.areaRepository.createQueryBuilder('area')
    .leftJoin('reservedGames.game', 'game')
    .where('area.id = :id', {id:id})
    .select('reservedGames.id', 'id')
    .addSelect('reservedGames.exposed', 'exposed')
    .addSelect('reservedGames.donation', 'donation')
    .addSelect('reservedGames.tombola', 'tombola')
    .addSelect('reservedGames.receiveDate', 'receiveDate')
    .addSelect('reservedGames.needReturn', 'needReturn')
    .addSelect('reservedGames.tableCount', 'tableCount')
    .getRawMany();
  }
}
