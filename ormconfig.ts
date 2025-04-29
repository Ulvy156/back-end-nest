import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const ormconfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: '172.16.10.83',
  port: 1433,
  username: 'sa',
  password: 'Chm_Sql@itD2',
  database: 'CML_Pilot',
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
