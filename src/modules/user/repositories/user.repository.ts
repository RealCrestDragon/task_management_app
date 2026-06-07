import { PublicUser } from 'src/common/types/user.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { User } from 'generated/prisma/browser';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: RegisterDto, username: string): Promise<User> {
    return this.prisma.user.create({ data: { username, ...payload } });
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return !!user;
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }

  async findUserById(id: number): Promise<PublicUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async findUserByUsername(username: string): Promise<PublicUser | null> {
    return this.prisma.user.findUnique({
      where: { username },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  async updateUser(id: number, payload: UpdateUserDto): Promise<PublicUser> {
    return this.prisma.user.update({
      where: { id },
      data: payload,
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
