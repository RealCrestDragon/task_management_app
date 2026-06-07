import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'generated/prisma/client';
interface CreateUserPayload {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: CreateUserPayload): Promise<User> {
    return this.prisma.user.create({ data: payload });
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return !!user;
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }
}
