import { Router } from 'express'

import { userRoutes } from './userRoutes'
import { companyRoutes } from './companyRoutes'
import { employeeRoutes } from './employeeRoutes'
import { absenceRoutes } from './absenceRoutes'
import { pointRoutes } from './pointRoutes'

export const apiRoutes = Router()

apiRoutes.use('/api/v1/user', userRoutes)
apiRoutes.use('/api/v1/company', companyRoutes)
apiRoutes.use('/api/v1/employee', employeeRoutes)
apiRoutes.use('/api/v1/absence', absenceRoutes)
apiRoutes.use('/api/v1/point', pointRoutes)