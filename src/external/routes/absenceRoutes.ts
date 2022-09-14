import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { AbsenceRepository } from '@repositories/absenceRepository'
import { AbsenceController } from '@controllers/absenceController'

export const absenceRoutes = Router()

const absenceRepository = new AbsenceRepository()
const absenceController = new AbsenceController(absenceRepository)

absenceRoutes.get('/', AuthMiddleware, (req, res) => absenceController.getAll(req, res))
absenceRoutes.get('/:id', AuthMiddleware, (req, res) => absenceController.getOne(req, res))
absenceRoutes.post('/', AuthMiddleware, (req, res) => absenceController.create(req, res))
absenceRoutes.put('/:id', AuthMiddleware, (req, res) => absenceController.update(req, res))
absenceRoutes.delete('/:id', AuthMiddleware, (req, res) => absenceController.delete(req, res))