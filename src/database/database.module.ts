import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from '../config/database.config';
import { Dialect } from 'sequelize';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = databaseConfig;
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DATABASE,
        dialect: 'postgres' as Dialect,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        logging: console.log,
        autoLoadModels: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
