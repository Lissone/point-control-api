/* eslint-disable no-console */
import 'reflect-metadata'
import '@external/envConfig'

import { connection } from '@external/database/dbConfig'

import { app } from './app'

const port = process.env.APP_PORT || 5000

connection
  .then(() => {
    console.log('Database connected')
  })
  .catch(console.log)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
