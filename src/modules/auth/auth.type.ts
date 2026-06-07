import { User } from 'generated/prisma/browser';

export type PlainUserWithoutPassword = Omit<
  User,
  'password' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export interface AuthResponse {
  user: PlainUserWithoutPassword;
  accessToken: string;
}
