import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import * as swaggerDocument from '../swagger.json'
import { apiRoutes } from 'src/external/routes'

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())

app.options('*', cors())

app.use(apiRoutes)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { app }