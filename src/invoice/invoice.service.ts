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

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceRepository.update(id,updateInvoiceDto);
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id);
  }
}
