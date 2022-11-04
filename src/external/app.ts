import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { apiRoutes } from '@external/routes'

// eslint-disable-next-line import/extensions
import * as swaggerDocument from '../swagger.json'

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())

app.options('*', cors())

app.use(apiRoutes)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }
