/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//load .env file
import * as dotenv from 'dotenv';
dotenv.config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '1433'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true, // Loads all columns dynamically
  logging: true,
  extra: {
    // Set global query timeout in milliseconds (1 hour = 3600000 ms)
    requestTimeout: 3600000, // 1 hour timeout
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default ormconfig;
