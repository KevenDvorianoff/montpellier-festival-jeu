import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { Festival } from 'src/festival/entities/festival.entity';

@Injectable()
export class PriceService {

  constructor(
    @InjectRepository(Price) private priceRepository: Repository<Price>,
    @InjectRepository(Festival) private festivalRepository: Repository<Festival>
  ){}

  async create(createPriceDto: CreatePriceDto) {
    const {festivalId, ...dto} = createPriceDto;

    const festival = await this.festivalRepository.findOne(festivalId);

    if(festival){
      return this.priceRepository.save({festival, ...dto});
    }
    else{
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.priceRepository.find();
  }

  async findOne(id: number) {
    
    const price = await this.priceRepository.findOne(id);

    if(price){
      return price;
    }
    else{
      throw new NotFoundException(`No price found with id ${id}`);
    }
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const result = await this.priceRepository.update(id,updatePriceDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.priceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
} 
