import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isConstraint } from '../utils';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UNIQUE_USERNAME } from './entities/user.entity';
import { PasswordService } from './password.service';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwordService: PasswordService
    ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.passwordService.hashPassword(createUserDto.password);
      const { password, ...result } = await this.userRepository.save(createUserDto);
      return result;
    } 
    catch (e) {
      if (isConstraint(e, UNIQUE_USERNAME)) {
        throw new BadRequestException('This username is already used');
      }
      throw new InternalServerErrorException('Unable to create a new user');
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      const { password, ...result } = user;
      return result;
    })
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    else {
      throw new NotFoundException(`No user found with id ${id}`);
    }
  }

  findByUsername(username: string) {
    const user = this.userRepository.find({
      where: {
        username,
      },
    });
    if (user) {
      return user;
    } 
    else {
      throw new NotFoundException(`No user with username ${username} can be found`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let result: UpdateResult;
    
    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    }

    try {
      result = await this.userRepository.update(id, updateUserDto);
    }
    catch (e) {
      if (isConstraint(e, UNIQUE_USERNAME)) {
        throw new BadRequestException('This username is already used');
      }
      throw new InternalServerErrorException('Unable to update this new user');
    }

    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
