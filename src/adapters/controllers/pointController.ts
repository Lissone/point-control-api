import { Request, Response } from 'express'

import { IPointUseCase } from '@useCases/point/IPointUseCase'

export class PointController {
  useCase: IPointUseCase

  constructor (useCase: IPointUseCase) {
    this.useCase = useCase
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const points = await this.useCase.getAll()

      res.status(200).json(points)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params

      const point = await this.useCase.getOne(Number(id))

      if (point == null) {
        res.sendStatus(404)
        return
      }

      res.status(200).json(point)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const point = await this.useCase.create(req.body)

      res.status(201).send(point)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

