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

Project developed as an activity of my bachelor's course in information systems, in order to serve as a back end for corporate time attendance application, with web and mobile compatibility. The api structure was created based on clean architecture and documented with Swagger (On api homepage).

For the development of this project, a flowchart was created as application documentation on <a href="https://whimsical.com/pointcontrol-5dryUV3teiRwy1rPzH3ekK" target="_blank">Whimsical</a>.

## Requirements

- [Npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [Nodejs](https://nodejs.org/en/)
- [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Technologies

- Nodejs
- Typescript
- Express
- Nodemon
- TypeORM
- Swagger (Documentation)
- ESLint (Airbnb config)
- Prettier

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
npm install
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

Need create first global admin user:

Default password: 123

```sql
INSERT INTO [dbo].[user]
(id, name, email, password, role, first_access, company_cnpj, created_at, updated_at)
VALUES (
  '08e5ad8d-5fa3-41a2-a732-b997336b4cf5', 
  'Global Admin',
  'admin@admin.com', 
  '$2y$05$JdbLU5VqejoIstt/jtJva.PkydhrKCc5uRBdQpJY1RjooSE/hSprK', 
  'global.admin',
  1,
  NULL, 
  '2001-12-11T22:30:00Z',
  '2001-12-11T22:30:00Z'
)
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

