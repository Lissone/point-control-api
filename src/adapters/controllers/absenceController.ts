import { Request, Response } from 'express'

import { IAbsenceUseCase } from '@useCases/absence/IAbsenceUseCase'

export class AbsenceController {
  useCase: IAbsenceUseCase

  constructor (useCase: IAbsenceUseCase) {
    this.useCase = useCase
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const absences = await this.useCase.getAll()

      res.status(200).json(absences)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params

      const absence = await this.useCase.getOne(Number(id))

      if (absence == null) {
        res.sendStatus(404)
        return
      }

      res.status(200).json(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const absence = await this.useCase.create(req.body)

      res.status(201).send(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params

      if(id != req.body.id) {
        res.sendStatus(400)
        return
      }

      const absence = await this.useCase.getOne(Number(id))

      if (absence == null) {
        res.sendStatus(404)
        return
      }

      const ret = await this.useCase.update(req.body)

      res.status(200).json(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async delete (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params

      const absence = await this.useCase.getOne(Number(id))

      if (absence == null) {
        res.sendStatus(404)
        return
      }

      await this.useCase.delete(Number(id))

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

