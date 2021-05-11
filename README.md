# PointControl - API

Api de uma aplicação de controle de pontos de empresas.

Estrutura de pastas baseada na clean architecture.

### Requerimentos

* [Yarn](https://yarnpkg.com/)
* [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
* [Nodejs](https://nodejs.org/en/)

### Dependências

* Express
* Nodemon
* TypeORM
* ESLint
* Prettier

### Instalando Dependencias

```bash
git clone https://github.com/Lissone/pointControl-api.git
cd pointControl-api

yarn
#or
npm run
```

### Configurações do Banco de dados

É necessário criar o database antes de executar o projeto (dbPointControl).

```typescript
// .\src\external\database\dbConfig.ts

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [**Entities**],
  synchronize: true,
  logging: false,
  options: {
    enableArithAbort: true
  }
})
```

### Executar projeto

```
yarn dev
#or
npm run
```
