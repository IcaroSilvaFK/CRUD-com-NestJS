import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(newUser: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        ...newUser,
      },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select:{
        name:true,
        posts:{
          select:{
            title:true,
            createAt:true
          }
        }
      }
    });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }
  async delete(id: string) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
  async update(id: string, user: UpdateUserDto) {
    const updateUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });

    return updateUser;
  }

}
