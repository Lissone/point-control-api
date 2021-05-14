import { Router } from 'express'

import { AbsenceRepository } from '@repositories/absenceRepository'
import { AbsenceUseCase } from '@useCases/absence/absenceUseCase'
import { AbsenceController } from '@controllers/absenceController'

export const absenceRoutes = Router()

const absenceRepository = new AbsenceRepository()
const absenceUseCase = new AbsenceUseCase(absenceRepository)
const absenceController = new AbsenceController(absenceUseCase)

absenceRoutes.get('/', (req, res) => absenceController.getAll(req, res))
absenceRoutes.get('/:id', (req, res) => absenceController.getOne(req, res))
absenceRoutes.post('/', (req, res) => absenceController.create(req, res))
absenceRoutes.put('/:id', (req, res) => absenceController.update(req, res))
absenceRoutes.delete('/:id', (req, res) => absenceController.delete(req, res))