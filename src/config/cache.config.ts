import * as dotenv from 'dotenv';
dotenv.config();

export const redisConfig = {
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
  REDIS_URL: process.env.REDIS_URL || '',
};

export default () => redisConfig;
