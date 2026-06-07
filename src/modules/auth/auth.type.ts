import { InferAttributes } from 'sequelize';
import { User } from '../../entities/user.entity';

export type PlainUserWithoutPassword = InferAttributes<
  User,
  { omit: 'password' | 'version' | 'createdAt' | 'updatedAt' | 'deletedAt' }
>;

export interface AuthResponse {
  user: PlainUserWithoutPassword;
  accessToken: string;
}
