import { HttpException, Injectable } from '@nestjs/common';
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
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.findAll();

      return users;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async findOne(email: string) {
    try {
      const user = this.prismaService.findOne(email);
      return user;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.prismaService.update(id, updateUserDto);
      return response;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.delete(id);
      return { message: 'User delete success' };
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
