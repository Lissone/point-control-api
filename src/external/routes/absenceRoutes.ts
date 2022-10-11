import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { AbsenceRepository } from '@repositories/absenceRepository'
import { EmployeeRepository } from '@repositories/employeeRepository'
import { UserRepository } from '@repositories/userRepository'

import { AbsenceController } from '@controllers/absenceController'

export const absenceRoutes = Router()

const absenceRepository = new AbsenceRepository()
const employeeRepository = new EmployeeRepository()
const userRepository = new UserRepository()

const absenceController = new AbsenceController(absenceRepository, employeeRepository, userRepository)

absenceRoutes.get('/', AuthMiddleware, (req, res) => absenceController.getAll(req, res))
absenceRoutes.get('/status/:status', AuthMiddleware, (req, res) => absenceController.findByStatus(req, res))
absenceRoutes.get('/:id', AuthMiddleware, (req, res) => absenceController.getOne(req, res))
absenceRoutes.post('/', AuthMiddleware, (req, res) => absenceController.create(req, res))
absenceRoutes.put('/:id', AuthMiddleware, (req, res) => absenceController.update(req, res))
absenceRoutes.delete('/:id', AuthMiddleware, (req, res) => absenceController.delete(req, res))