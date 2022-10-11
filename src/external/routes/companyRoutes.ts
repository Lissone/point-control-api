import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { CompanyRepository } from '@repositories/companyRepository'
import { CompanyController } from '@controllers/companyController'

export const companyRoutes = Router()

const companyRepository = new CompanyRepository()
const companyController = new CompanyController(companyRepository)

companyRoutes.get('/', AuthMiddleware, (req, res) => companyController.getAll(req, res))
companyRoutes.get('/:cnpj', AuthMiddleware, (req, res) => companyController.getOne(req, res))
companyRoutes.post('/', AuthMiddleware, (req, res) => companyController.create(req, res))
companyRoutes.put('/:cnpj', AuthMiddleware, (req, res) => companyController.update(req, res))