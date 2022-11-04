import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { PointRepository } from '@repositories/pointRepository'
import { UserRepository } from '@repositories/userRepository'

import { PointController } from '@controllers/pointController'

export const pointRoutes = Router()

const pointRepository = new PointRepository()
const userRepository = new UserRepository()

const pointController = new PointController(pointRepository, userRepository)

pointRoutes.get('/:createdAt', AuthMiddleware, (req, res) => pointController.findByCreatedAt(req, res))
pointRoutes.get('/employee/:cpf', AuthMiddleware, (req, res) => pointController.findByEmployeeCpf(req, res))
pointRoutes.post('/', AuthMiddleware, (req, res) => pointController.create(req, res))
