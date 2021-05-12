import express from 'express'

import { companyRoutes } from './companyRoutes'
import { employeeRoutes } from './employeeRoutes'

const apiRoutes = express.Router()

apiRoutes.use('/api/v1/company', companyRoutes)
apiRoutes.use('/api/v1/employee', employeeRoutes)

export { apiRoutes }