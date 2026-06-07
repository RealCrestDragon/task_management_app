import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT || 5432),
  POSTGRES_USER: process.env.POSTGRES_USER || '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '',
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || '',
};

export default () => databaseConfig;
