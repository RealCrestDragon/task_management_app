import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from 'src/entities/user.entity';

interface CreateUserPayload {
  username: string;
  password: string;
  email: string;
  fullName: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(payload: CreateUserPayload): Promise<User> {
    return this.userModel.create({ ...payload });
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    return !!user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
  }
}
