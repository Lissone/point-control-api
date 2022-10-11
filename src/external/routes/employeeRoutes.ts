import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { EmployeeRepository } from '@repositories/employeeRepository'
import { UserRepository } from '@repositories/userRepository'

import { EmployeeController } from '@controllers/employeeController'

export const employeeRoutes = Router()

const employeeRepository = new EmployeeRepository()
const userRepository = new UserRepository()
const employeeController = new EmployeeController(employeeRepository, userRepository)


employeeRoutes.get('/', AuthMiddleware, (req, res) => employeeController.getAll(req, res))
employeeRoutes.get('/company/:cnpj', AuthMiddleware, (req, res) => employeeController.findByCompanyCnpj(req, res))
employeeRoutes.get('/:cpf', AuthMiddleware, (req, res) => employeeController.getOne(req, res))
employeeRoutes.post('/', AuthMiddleware, (req, res) => employeeController.create(req, res))
employeeRoutes.put('/:cpf', AuthMiddleware, (req, res) => employeeController.update(req, res))