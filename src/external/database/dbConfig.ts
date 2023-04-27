import path from 'path'
import { createConnection } from 'typeorm'

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true,
  logging: false,
  options: {
    enableArithAbort: true
  }
})

export { connection }
