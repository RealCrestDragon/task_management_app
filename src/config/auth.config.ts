import * as dotenv from 'dotenv';
dotenv.config();

export const authConfig = {
  JWT_KEY: process.env.JWT_KEY || '',
};

export default () => authConfig;
