import { Request, Response } from 'express'

import { IAbsenceRepository } from '@interfaces/absence'

export class AbsenceController {
  repository: IAbsenceRepository

  constructor (repository: IAbsenceRepository) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) {
    try {
      const absences = await this.repository.getAll()
      res.status(200).json(absences)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const absence = await this.repository.getOne(Number(id))

      if (!absence) {
        return res.send(404).json({ message: 'Absence not found' })
      }

      res.status(200).json(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { id } = req.body
      let absence = await this.repository.getOne(id)

      if (absence) {
        return res.send(409).json({ message: 'Absence already exists' })
      }

      absence = await this.repository.create(req.body)
      res.status(201).send(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const absence = await this.repository.getOne(Number(id))

      if (!absence) {
        return res.status(404).json({ message: 'Absence not found' })
      }

      const ret = await this.repository.update(req.body)
      res.status(200).json(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
      const absence = await this.repository.getOne(Number(id))

      if (!absence) {
        return res.status(404).json({ message: 'Absence not found' })
      }

      await this.repository.delete(Number(id))
      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

