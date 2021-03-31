import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isConstraint } from 'src/utils';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, UNIQUE_COMPANY_NAME } from './entities/company.entity';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) { }

  create(createCompanyDto: CreateCompanyDto) {
    try {
      return this.companyRepository.save(createCompanyDto);
    }
    catch (e) {
      if (isConstraint(e, UNIQUE_COMPANY_NAME)) {
        throw new BadRequestException('This company name is already used');
      }
      throw new InternalServerErrorException('Unable to create a new company');
    }
  }

  findAll(findCompanyDto: FindCompanyDto) {

    const query = this.companyRepository.createQueryBuilder('company')

    if (findCompanyDto.isPublisher !== undefined) {
      query.where('company.isPublisher = :isPublisher', { isPublisher: findCompanyDto.isPublisher })
    }

    if (findCompanyDto.isExhibitor !== undefined) {
      if (findCompanyDto.isPublisher !== undefined) {
        query.andWhere('company.isExhibitor = :isExhibitor', { isExhibitor: findCompanyDto.isExhibitor })
      }
      else {
        query.where('company.isExhibitor = :isExhibitor', { isExhibitor: findCompanyDto.isExhibitor })
      }
    }

    if (findCompanyDto.isActive !== undefined) {
      if (findCompanyDto.isPublisher !== undefined || findCompanyDto.isExhibitor !== undefined) {
        query.andWhere('company.isActive = :isActive', { isActive: findCompanyDto.isActive })
      }
      else {
        query.where('company.isActive = :isActive', { isActive: findCompanyDto.isActive })
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

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    let result: UpdateResult;

    try {
      result = await this.companyRepository.update(id, updateCompanyDto);
    }

    catch (e) {
      if (isConstraint(e, UNIQUE_COMPANY_NAME)) {
        throw new BadRequestException('This company name is already used');
      }
      throw new InternalServerErrorException('Unable to update a new company');
    }

    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
