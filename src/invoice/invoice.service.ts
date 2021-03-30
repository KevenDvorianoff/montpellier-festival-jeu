import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>) {}
  create(createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceRepository.save(createInvoiceDto);
  }

  findAll() {
    return this.invoiceRepository.find();
  }

  async findOne(id: number) {
    const invoice = await this.invoiceRepository.findOne(id);
    if (invoice) {
      return invoice;
    }
    else {
      throw new NotFoundException(`No invoice found with id ${id}`);
    }
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    const result = await this.invoiceRepository.update(id,updateInvoiceDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.invoiceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
