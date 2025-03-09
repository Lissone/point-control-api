import path from 'path'
import { createConnection } from 'typeorm'

const connection = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  synchronize: true, // ⚠️ Usar apenas em desenvolvimento! Em produção, use migrations.
  logging: false
})

connection
  .then(() => console.log('PostgreSQL conectado com sucesso! 🚀'))
  .catch(error => console.error('Erro ao conectar ao PostgreSQL:', error))

export { connection }
