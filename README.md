<h1 align="center">
  PointControl - Api
</h1>

<p align="center">
  <a href="#description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#demonstrations">Demonstrations</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contributors">Contributors</a>
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

This project is the Back-end (Api) of a company point control application. To illustrate in a simple way, this api controls and stores all employee data, entry points, exit, pause, absences from work and all this being managed by employees of the company itself, who have specific and special credentials for this.

Project developed as an activity of my bachelor's degree in information systems, with the main objective of having a very descriptive and extensive documentation, for anyone to understand the features and learn from it. The api framework was built on clean architecture and documented with Swagger.

To facilitate the development of the project and better describe everything that was created, a flowchart of some of the project's features and relevant information at the time of its development was designed, using <a href="https://whimsical.com/pointcontrol-5dryUV3teiRwy1rPzH3ekK" target="_blank">Whimsical</a>.

To access the other projects integrated to this one, access:

- <a href="https://github.com/Lissone/point-control-admin-web" target="_blank">Front-end to admin users</a>
- <a href="https://github.com/almeidavini/point-control" target="_blank">Front-end to employees</a>

This project was done in partnership with:

- <a href="https://github.com/MikaMorais" target="_blank">Moises Morais</a>
- <a href="https://github.com/steniodr" target="_blank">Stenio Rapchan</a>
- <a href="https://github.com/almeidavini" target="_blank">Vinicius Almeida</a>

## Demonstrations

Front-end to admin users

https://user-images.githubusercontent.com/57052110/194934760-04bbc99d-4cce-464e-a93d-7f47beb80742.mp4

Front-end to employees

https://user-images.githubusercontent.com/57052110/200085812-502e5746-05b4-4497-82eb-796c923ff65b.mp4

## Requirements

- [Npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [Nodejs](https://nodejs.org/en/)
- [Redis](https://redis.io/)
- [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Technologies

- Nodejs
- Typescript
- Express
- TypeORM
- IoRedis
- Nodemailer
- Swagger (Documentation)
- Eslint
  - Airbnb-config with another pessoal rules
  - Import helpers plugin
- Prettier
- Commitizen

## Usage

You can clone it on your pc using the command:

```bash
git clone https://github.com/Lissone/pointControl-api.git
cd pointControl-api
```

### Initial settings before running project

Because we use external services, it is necessary to make some simple configurations before running the project.

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

Default password: 123456

```sql
INSERT INTO [dbo].[user]
(id, name, email, password, role, first_access, company_cnpj, created_at, updated_at)
VALUES (
  '08e5ad8d-5fa3-41a2-a732-b997336b4cf5',
  'Global Admin',
  'admin@admin.com',
  '$2a$05$MG6XoOEDPjtXVesTW8P2S.UkNzii1ai7VEAvBnToDHZq03sSij2vi',
  'global.admin',
  1,
  NULL,
  '2001-12-11T22:30:00Z',
  '2001-12-11T22:30:00Z'
)
```

### Email configuration

If you are using your gmail account to use the messaging system with Nodemailer, you should give access to <a href="https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4PzIfR0P6cezk9W9qg5xrvKjdjnlQ-oSFiXuT4yVX_S5YpKKcf5I5vJdWtzw7oaWydt9nVFxvMUspZzNR38DCKgOHSEOw" target="_blank">your account</a> to less secure apps, even though they are secure.

Need to add environment variables:

```bash
# .\.env

# DEFAULT
PORT=5000
SECRET_KEY=super_secret # JWT secret key

# REDIS
REDIS_HOST=localhost
REDIS_PORT=6379

# DATABASE
DB_USERNAME=sa
DB_PASSWORD=123456
DB_NAME=dbPointControl
DB_HOST=localhost

# NODEMAILER
NODEMAILER_USER= # Email used for sending messages
NODEMAILER_PASS= # Your email password
```

If you have <b>Docker</b>, and want to run the container, use the command:

```bash
# Build the project container
docker-compose build
# Up container
docker-compose up
```

Install dependencies using:

```bash
yarn
#or
npm install
```

Run api:

```bash
yarn dev
#or
npm run dev
```

## Contributors

Thanks goes to these wonderful people, who were part of the project from start to finish:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MikaMorais" target="_blank">
        <img src="https://github.com/MikaMorais.png" width="100px;" alt="Moises Morais photo"/><br>
        <sub>
          <b>Moises Morais</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/steniodr" target="_blank">
        <img src="https://github.com/steniodr.png" width="100px;" alt="Stenio Rapchan photo"/><br>
        <sub>
          <b>Stenio Rapchan</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/almeidavini" target="_blank">
        <img src="https://github.com/almeidavini.png" width="100px;" alt="Vinicius Almeida photo"/><br>
        <sub>
          <b>Vinicius Almeida</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<hr />
