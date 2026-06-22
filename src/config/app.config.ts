import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: Number(process.env.APP_PORT || 3000),
};

export default () => appConfig;
