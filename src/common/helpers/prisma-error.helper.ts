import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { DriverAdapterError } from '../types/prisma.type';

export const getP2002Fields = (
  error: PrismaClientKnownRequestError,
): string[] => {
  const driverError = error.meta?.driverAdapterError as DriverAdapterError;
  return driverError?.cause?.constraint?.fields ?? [];
};
