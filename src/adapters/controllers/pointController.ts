import { Request, Response } from 'express'

import { IPointRepository } from '@interfaces/point'

export class PointController {
  readonly repository: IPointRepository
  
  constructor (repository: IPointRepository) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) {
    try {
      const points = await this.repository.getAll()
      res.status(200).json(points)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const point = await this.repository.getOne(Number(id))

      if (!point) {
        return res.send(404).json({ message: 'Point not found' })
      }

      res.status(200).json(point)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const point = await this.repository.create(req.body)
      res.status(201).send(point)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

