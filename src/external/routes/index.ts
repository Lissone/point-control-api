import { Router } from 'express'

import { absenceRoutes } from './absenceRoutes'
import { companyRoutes } from './companyRoutes'
import { employeeRoutes } from './employeeRoutes'
import { pointRoutes } from './pointRoutes'
import { userRoutes } from './userRoutes'

export const apiRoutes = Router()

apiRoutes.use('/api/v1/user', userRoutes)
apiRoutes.use('/api/v1/company', companyRoutes)
apiRoutes.use('/api/v1/employee', employeeRoutes)
apiRoutes.use('/api/v1/absence', absenceRoutes)
apiRoutes.use('/api/v1/point', pointRoutes)
