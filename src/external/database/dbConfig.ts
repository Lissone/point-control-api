import { createConnection } from 'typeorm'

import { CompanyEntity } from './entities/CompanyEntity'
import { EmployeeEntity } from './entities/EmployeeEntity'

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [CompanyEntity, EmployeeEntity],
  synchronize: true,
  logging: false,
  options: {
    enableArithAbort: true
  }
})

export { connection }