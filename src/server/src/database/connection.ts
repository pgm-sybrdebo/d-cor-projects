import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;


const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: "ec2-52-206-182-219.compute-1.amazonaws.com",  
  port: Number(5432),
  username: "nkjzqjuwwdjmxs",
  password: "8e117ff91fac551a057418540b8ea44182cac56505a9888dbde0b697112aa735",
  database: "d2531rr627mboh",
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
