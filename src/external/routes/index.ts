import express from 'express'

import { companyRoutes } from './companyRoutes'
import { employeeRoutes } from './employeeRoutes'
import { addressRoutes } from './addressRoutes'

export const apiRoutes = express.Router()

apiRoutes.use('/api/v1/company', companyRoutes)
apiRoutes.use('/api/v1/employee', employeeRoutes)
apiRoutes.use('/api/v1/address', addressRoutes)