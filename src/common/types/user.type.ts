import { User } from 'generated/prisma/browser';

export type PublicUser = Omit<
  User,
  'password' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
