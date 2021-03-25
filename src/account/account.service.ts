import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isConstraint } from '../utils';
import { Repository, UpdateResult } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account, UNIQUE_USERNAME } from './entities/account.entity';
import { PasswordService } from './password.service';

@Injectable()
export class AccountService {
  
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private passwordService: PasswordService
    ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      createAccountDto.password = await this.passwordService.hashPassword(createAccountDto.password);
      const { password, ...account } = await this.accountRepository.save(createAccountDto);
      return account;
    } 
    catch (e) {
      if (isConstraint(e, UNIQUE_USERNAME)) {
        throw new BadRequestException('This username is already used');
      }
      throw new InternalServerErrorException('Unable to create a new user');
    }
  }

  async findAll() {
    const accounts = await this.accountRepository.find();
    return accounts.map((account) => {
      const { password, ...result } = account;
      return result;
    })
  }

  async findOne(id: number) {
    const account = await this.accountRepository.findOne(id);
    if (account) {
      //const { password, ...result } = account;
      return account;
    }
    else {
      throw new NotFoundException(`No account found with id ${id}`);
    }
  }

  findByUsername(login: string) {
    const account = this.accountRepository.find({
      where: {
        login,
      },
    });
    if (account) {
      return account;
    } 
    else {
      throw new NotFoundException(
        `No user with username ${login} can be found`,
      );
    }
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    let result: UpdateResult;
    
    if (updateAccountDto.password) {
      updateAccountDto.password = await this.passwordService.hashPassword(updateAccountDto.password);
    }

    try {
      result = await this.accountRepository.update(id, updateAccountDto);
    }
    catch (e) {
      if (isConstraint(e, UNIQUE_USERNAME)) {
        throw new BadRequestException('This username is already used');
      }
      throw new InternalServerErrorException('Unable to create a new user');
    }

    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }
}
