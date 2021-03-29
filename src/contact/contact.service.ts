import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {

  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
    @InjectRepository(Company) private companyRepository: Repository<Company>
  ) {}

  async create(createContactDto: CreateContactDto) {
    const { companyId, ...dto } = createContactDto;
    const company = await this.companyRepository.findOne(companyId);
    if (company) {
      return this.contactRepository.save({ company, ...dto });
    }
    else {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.contactRepository.find();
  }

  findAllForCompany(id: number){


    return this.contactRepository.createQueryBuilder("contact")
    .leftJoin("contact.company", "company")
    .where("company.id = :id", {id: id})
    .getMany()
  }

  async findOne(id: number) {
    const contact = await this.contactRepository.findOne(id);
    if (contact) {
      return contact;
    }
    else {
      throw new NotFoundException(`No contact found with id ${id}`);
    }
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepository.update(id, updateContactDto);
  }

  remove(id: number) {
    return this.contactRepository.delete(id);
  }
}
