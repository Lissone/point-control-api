import { Router } from 'express'

import { EmployeeRepository } from '@repositories/employeeRepository'
import { EmployeeUseCase } from '@useCases/employee/employeeUseCase'
import { EmployeeController } from '@controllers/employeeController'

const employeeRoutes = Router()

const employeeRepository = new EmployeeRepository()
const employeeUseCase = new EmployeeUseCase(employeeRepository)
const employeeController = new EmployeeController(employeeUseCase)

employeeRoutes.get('/', (req, res) => employeeController.getAll(req, res))
employeeRoutes.get('/:cpf', (req, res) => employeeController.getOne(req, res))
employeeRoutes.post('/', (req, res) => employeeController.create(req, res))
employeeRoutes.put('/:cpf', (req, res) => employeeController.update(req, res))

export { employeeRoutes }