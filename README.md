<h1 align="center">
  PointControl - Api
</h1>

<p align="center">
  <a href="#description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>
</p>
<br />
<p align="center">
  <img src="https://img.shields.io/static/v1?label=license&message=MIT" alt="License">
  <img src="https://img.shields.io/github/repo-size/Lissone/point-control-api" alt="Repo size" />
  <img src="https://img.shields.io/github/languages/top/Lissone/point-control-api" alt="Top lang" />
  <img src="https://img.shields.io/github/stars/Lissone/point-control-api" alt="Stars repo" />
  <img src="https://img.shields.io/github/forks/Lissone/point-control-api" alt="Forks repo" />
  <img src="https://img.shields.io/github/issues-pr/Lissone/point-control-api" alt="Pull requests" >
  <img src="https://img.shields.io/github/last-commit/Lissone/point-control-api" alt="Last commit" />
</p>

<p align="center">
  <a href="https://github.com/Lissone/point-control-api/issues">Report bug</a>
  ·
  <a href="https://github.com/Lissone/point-control-api/issues">Request feature</a>
</p>

<br />

## Description

Api of a company points control application.

Projeto desenvolvido como atividade do meu curso bacharelado de sistemas de informação, com o intuito de servir como back end para aplicação de controle de ponto de empresas, com compatibilidade web e mobile. A estrutura da api foi criada baseada na clean architecture e documentada com Swagger (On api homepage).

For the development of this project, a flowchart was created as application documentation on <a href="https://whimsical.com/pointcontrol-5dryUV3teiRwy1rPzH3ekK" target="_blank">Whimsical</a>.

## Requirements

* [Npm](https://www.npmjs.com/)
* [Yarn](https://yarnpkg.com/)
* [Nodejs](https://nodejs.org/en/)
* [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Technologies

* Typescript
* Express
* Nodemon
* TypeORM
* Swagger (Documentation)
* ESLint (Airbnb config)
* Prettier

## Usage

You can clone it on your pc using the command:
```bash
git clone https://github.com/Lissone/pointControl-api.git
cd pointControl-api
```

Install dependencies using:
```bash
yarn
#or
npm run
```

### Database configuration

You must create the database before running an api (dbPointControl).
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

Need to add environment variables:
```bash
# .\.env

# DEFAULT
PORT=5000

# DATABASE
DB_USERNAME=sa
DB_PASSWORD=123456
DB_NAME=dbPointControl
DB_HOST=localhost
```

Run api:
```bash
yarn dev
#or
npm run dev
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

<h4 align="center">
  Made with ❤️ by <a href="https://github.com/Lissone" target="_blank">Lissone</a>
</h4>

<hr />

