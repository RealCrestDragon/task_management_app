import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PublicUser } from 'src/common/types/user.type';
import { UpdateUserDto } from './dto/updateUser.dto';
import { hashPassword } from 'src/common/utils/bcrypt.util';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: number): Promise<PublicUser> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, payload: UpdateUserDto): Promise<PublicUser> {
    const { password } = payload;
    const hash = await hashPassword(password);
    try {
      const result = await this.userRepository.updateUser(id, {
        ...payload,
        password: hash,
      });
      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username already taken');
      }
      throw error;
    }
  }
}
