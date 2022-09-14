import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { PointRepository } from '@repositories/pointRepository'
import { PointController } from '@controllers/pointController'

export const pointRoutes = Router()

const pointRepository = new PointRepository()
const pointController = new PointController(pointRepository)

pointRoutes.get('/', AuthMiddleware, (req, res) => pointController.getAll(req, res))
pointRoutes.get('/:id', AuthMiddleware, (req, res) => pointController.getOne(req, res))
pointRoutes.post('/', AuthMiddleware, (req, res) => pointController.create(req, res))