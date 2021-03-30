import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateReservedTableDto } from './dto/create-reserved-table.dto';
import { UpdateReservedTableDto } from './dto/update-reserved-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservedTable } from './entities/reserved-table.entity';
import { Repository } from 'typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Price } from 'src/price/entities/price.entity';

@Injectable()
export class ReservedTableService {
  constructor(
    @InjectRepository(ReservedTable) private reservedtableRepository: Repository<ReservedTable>,
    @InjectRepository(Price) private priceRepository: Repository<Price>,
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>
    ) {}

  async create(createReservedTableDto: CreateReservedTableDto) {
    const { priceId, reservationId, ...dto } = createReservedTableDto;
    const price = await this.priceRepository.findOne(priceId);
    const reservation = await this.reservationRepository.findOne(reservationId);
    if (price){
      if (reservation){
        return this.reservedtableRepository.save({price, reservation, ...dto});
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
    return this.reservedtableRepository.find({
      relations : [ 'price', 'reservation']
    });
  }

  async findOne(idPrice: number, idReservation: number) {
    const reservedTable = await this.reservedtableRepository.findOne({price: { id: idPrice }, reservation: { id: idReservation }}, {
      relations : [ 'price', 'reservation']
    });
    if (reservedTable) {
      return reservedTable;
    }
    else {
      throw new NotFoundException(`No reserved table found with price id ${idPrice} and reservation id ${idReservation}`);
    }
  }

  async update(idPrice: number, idReservation: number, updateReservedTableDto: UpdateReservedTableDto) {
    const result = await this.reservedtableRepository.update({price: { id: idPrice }, reservation: { id: idReservation }}, updateReservedTableDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(idPrice: number, idReservation: number) {
    const result = await this.reservedtableRepository.delete({price: { id: idPrice }, reservation: { id: idReservation }});
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
