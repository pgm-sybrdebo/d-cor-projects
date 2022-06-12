import { ConnectionOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();
const nodeEnvironment = `${(
  process.env.NODE_ENV || 'development'
).toLowerCase()}`;


const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: "ec2-54-228-218-84.eu-west-1.compute.amazonaws.com",  
  port: Number(5432),
  username: "hpphelfhushniu",
  password: "4b608475cc5cc9efac88be52e57c689fd4539f2c66eef2745b5deb824965811f",
  database: "dh5s2j7ogrtta",
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
