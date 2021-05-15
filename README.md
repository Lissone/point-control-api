<h1 align="center">
  PointControl - API
</h1>

<p align="center">
  <a href="#descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requerimentos">Requerimentos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalando">Dependencias</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>

## Descrição
Api de uma aplicação de controle de pontos de empresas.

Estrutura de pastas baseada na clean architecture.

Criada a documentação da api utlizando swagger. (Página inicial da aplicação)

### Requerimentos

* [Yarn](https://yarnpkg.com/)
* [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
* [Nodejs](https://nodejs.org/en/)

### Tecnologias

* Typescript
* Express
* Nodemon
* TypeORM
* ESLint
* Prettier
* Swagger

### Instalando Dependencias

```bash
git clone https://github.com/Lissone/pointControl-api.git
cd pointControl-api

yarn
#or
npm run
```

### Configurações do Banco de dados

É necessário criar o database antes de executar o projeto (dbPointControl), e alterar as variáveis de ambiente, encontradas no arquivo: .env.

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
