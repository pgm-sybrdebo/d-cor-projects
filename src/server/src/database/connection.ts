import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;


const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,  
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: nodeEnvironment === 'development' ? true : false,
  dropSchema: nodeEnvironment === 'test' ? true : false,
  // ssl: true,
  ssl: { rejectUnauthorized: false }
};

// important to work with CLI
module.exports = {
  ...typeormConfig,
  seeds: [__dirname + '/../database/**/*.seed{.ts,.js}'],
  factories: [__dirname + '/../database/**/*.factory{.ts,.js}'],
};
