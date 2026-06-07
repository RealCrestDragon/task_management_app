import * as dotenv from 'dotenv';
dotenv.config();

export const cacheConfig = {
  REDIS_URL: process.env.REDIS_URL || '',
};

export default () => cacheConfig;
