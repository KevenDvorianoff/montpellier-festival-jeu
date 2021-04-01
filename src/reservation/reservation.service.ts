import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Festival } from 'src/festival/entities/festival.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
    @InjectRepository(Festival) private festivalRepository: Repository<Festival>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { festivalId, companyId, invoiceId, ...dto } = createReservationDto;
    const festival = await this.festivalRepository.findOne(festivalId);
    const company = await this.companyRepository.findOne(companyId);

    if (invoiceId) {
      const invoice = await this.invoiceRepository.findOne(invoiceId);

      if (festival && company && invoice) {
        return this.reservationRepository.save({ festival, company, invoice, ...dto });
      }
      else {
        throw new BadRequestException();
      }
    }
    else {
      if (festival && company) {
        return this.reservationRepository.save({ festival, company, ...dto });
      }
      else {
        throw new BadRequestException();
      }
    }
  }

  findAll() {
    return this.reservationRepository.createQueryBuilder('reservation')
    .leftJoin('reservation.festival','festival')
    .leftJoin('reservation.company', 'company')
    .where('festival.isActive = true')
    .select("reservation.id","id")
    .addSelect('reservation.needVolunteers', "needVolunteers")
    .addSelect('reservation.isPresent','isPresent')
    .addSelect('reservation.isPlaced', 'isPlaced')
    .addSelect('company.name','companyName')
    .getRawMany();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne(id);
    if (reservation) {
      return reservation;
    }
    else {
      throw new NotFoundException(`No reservation found with id ${id}`)
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const { invoiceId, ...dto } = updateReservationDto;
    
    if (invoiceId) {
      const invoice = await this.invoiceRepository.findOne(invoiceId);

      if (invoice) {
        const result = await this.reservationRepository.update(id, { invoice, ...dto });
        if (result.affected === 0) {
          throw new NotFoundException();
        }
        return result;
      }
      else {
        throw new BadRequestException();
      }
    }
    else {
        const result = await this.reservationRepository.update(id, updateReservationDto);
        if (result.affected === 0) {
          throw new NotFoundException();
        }
        return result;
    }
  }

  async remove(id: number) {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
