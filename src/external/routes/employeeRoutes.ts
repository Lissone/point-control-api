import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { EmployeeRepository } from '@repositories/employeeRepository'
import { EmployeeController } from '@controllers/employeeController'

export const employeeRoutes = Router()

const employeeRepository = new EmployeeRepository()
const employeeController = new EmployeeController(employeeRepository)

employeeRoutes.get('/', AuthMiddleware, (req, res) => employeeController.getAll(req, res))
employeeRoutes.get('/:cpf', AuthMiddleware, (req, res) => employeeController.getOne(req, res))
employeeRoutes.post('/', AuthMiddleware, (req, res) => employeeController.create(req, res))
employeeRoutes.put('/:cpf', AuthMiddleware, (req, res) => employeeController.update(req, res))