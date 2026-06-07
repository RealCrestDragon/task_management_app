/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get<string>('POSTGRES_URL'),
    });
    super({ adapter, log: ['query', 'info', 'warn', 'error'] });
    this.$extends({
      query: {
        $allModels: {
          async delete({ model, args }) {
            return this[model].update({
              where: args.where,
              data: { deletedAt: new Date() },
            });
          },
          async deleteMany({ model, args }) {
            return this[model].updateMany({
              where: args.where,
              data: { deletedAt: new Date() },
            });
          },
          async findMany({ args, query }) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          },
          async findUnique({ args, query }) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          },
          async findFirst({ args, query }) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          },
          async findUniqueOrThrow({ args, query }) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          },
          async findFirstOrThrow({ args, query }) {
            args.where = { ...args.where, deletedAt: null };
            return query(args);
          },
        },
      },
    });
  }
}
