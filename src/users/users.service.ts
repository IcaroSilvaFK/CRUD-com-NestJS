import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../common/errors/types/NotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const response = await this.prismaService.create(createUserDto);
    return response;
  }

  async findAll() {
    const users = await this.prismaService.findAll();

    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.findOne(id);
    if(!user){
      throw new NotFoundError('Usuario não encontrado')
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const response = await this.prismaService.update(id, updateUserDto);
    return response;
  }

  async remove(id: string) {
    await this.prismaService.delete(id);
    return { message: 'User delete success' };
  }
}
