import { Router } from 'express'

import { CompanyRepository } from '@repositories/companyRepository'
import { CompanyUseCase } from '@useCases/company/companyUseCase'
import { CompanyController } from '@controllers/companyController'

const companyRoutes = Router()

const companyRepository = new CompanyRepository()
const companyUseCase = new CompanyUseCase(companyRepository)
const companyController = new CompanyController(companyUseCase)

companyRoutes.get('/', (req, res) => companyController.getAll(req, res))
companyRoutes.get('/:cnpj', (req, res) => companyController.getOne(req, res))
companyRoutes.post('/', (req, res) => companyController.create(req, res))

export { companyRoutes }