import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) { }

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.save(createCompanyDto);
  }

  findAll(findCompanyDto: FindCompanyDto) {

    const query = this.companyRepository.createQueryBuilder('company')

    if (findCompanyDto.isPublisher !== undefined) {
      query.where('company.isPublisher = :isPublisher', { isPublisher: findCompanyDto.isPublisher})
    }

    if (findCompanyDto.isExhibitor !== undefined) {
      if (findCompanyDto.isPublisher !== undefined) {
        query.andWhere('company.isExhibitor = :isExhibitor', { isExhibitor: findCompanyDto.isExhibitor})
      }
      else {
        query.where('company.isExhibitor = :isExhibitor', { isExhibitor: findCompanyDto.isExhibitor})
      }
    }

    if (findCompanyDto.isActive !== undefined) {
      if (findCompanyDto.isPublisher !== undefined || findCompanyDto.isExhibitor !== undefined) {
        query.andWhere('company.isActive = :isActive', { isActive: findCompanyDto.isActive})
      }
      else {
        query.where('company.isActive = :isActive', { isActive: findCompanyDto.isActive})
      }
    }

    return query.getMany()
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
