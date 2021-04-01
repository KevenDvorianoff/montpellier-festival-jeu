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
    return this.contactRepository.createQueryBuilder('contact')
    .leftJoin("contact.company","company")
    .select("contact.id", "id")
    .addSelect("contact.firstname","firstname")
    .addSelect("contact.lastname","lastname")
    .addSelect("contact.isPrincipal", "isPrincipal")
    .addSelect("contact.email","email")
    .addSelect("contact.personalPhone", "personalPhone")
    .addSelect("contact.workPhone", "workPhone")
    .addSelect("contact.street", "street")
    .addSelect("contact.city", "city")
    .addSelect("contact.postalCode", "postalCode")
    .addSelect("contact.function", "function")
    .addSelect("company.id", "companyId")
    .addSelect("company.name", "companyName")
    .getRawMany();
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

  async update(id: number, updateContactDto: UpdateContactDto) {
    const result = await this.contactRepository.update(id, updateContactDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.contactRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
