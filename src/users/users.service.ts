import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedErroir';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const response = await this.prismaService.create(createUserDto);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.findAll();

      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(email: string) {
    throw new UnauthorizedError('Não autorizado');
    const user = this.prismaService.findOne(email);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.prismaService.update(id, updateUserDto);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.delete(id);
      return { message: 'User delete success' };
    } catch (error) {
      console.log(error);
    }
  }
}
