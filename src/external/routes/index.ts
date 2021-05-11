import express from 'express'

import { companyRoutes } from './companyRoutes'

const apiRoutes = express.Router()

apiRoutes.use('/api/v1/company', companyRoutes)

export { apiRoutes }