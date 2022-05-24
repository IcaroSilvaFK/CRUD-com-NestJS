import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(newUser: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        email: newUser.email,
      },
    });

    if (userExists) {
      throw new Error();
    }

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
    });

    if (!user) {
      throw new Error();
    }

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
