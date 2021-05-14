import { Router } from 'express'

import { PointRepository } from '@repositories/pointRepository'
import { PointUseCase } from '@useCases/point/pointUseCase'
import { PointController } from '@controllers/pointController'

export const pointRoutes = Router()

const pointRepository = new PointRepository()
const pointUseCase = new PointUseCase(pointRepository)
const pointController = new PointController(pointUseCase)

pointRoutes.get('/', (req, res) => pointController.getAll(req, res))
pointRoutes.get('/:id', (req, res) => pointController.getOne(req, res))
pointRoutes.post('/', (req, res) => pointController.create(req, res))