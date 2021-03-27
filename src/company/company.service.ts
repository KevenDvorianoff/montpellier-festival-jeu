import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne(id);
    if (company) {
      return company
    }
    else {
      throw new NotFoundException(`No company found with id ${id}`)
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
