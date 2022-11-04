import { Request, Response } from 'express'

import { MSG } from '@shared/msg'

import { IPointRepository } from '@interfaces/point'
import { IUserRepository } from '@interfaces/user'

export class PointController {
  private readonly pointRepository: IPointRepository
  private readonly userRepository: IUserRepository

  constructor(pointRepository: IPointRepository, userRepository: IUserRepository) {
    this.pointRepository = pointRepository
    this.userRepository = userRepository
  }

  async findByCreatedAt(req: Request, res: Response) {
    try {
      const { createdAt } = req.params // yyyy-MM-dd
      const { userDecoded } = req.body

      const user = await this.userRepository.getOneByEmail(userDecoded.email)

      const formattedCreatedAt = new Date(createdAt)
      const points = await (user.companyCnpj
        ? this.pointRepository.findByCreatedAtWithCompanyCnpj(formattedCreatedAt, user.companyCnpj)
        : this.pointRepository.findByCreatedAt(formattedCreatedAt))
      if (!points) {
        return res.status(404).json({ error: MSG.POINT_NOT_FOUND })
      }

      return res.status(200).json(points)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async findByEmployeeCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.params

      const points = await this.pointRepository.findByEmployeeCpf(cpf)
      if (!points) {
        return res.status(404).json({ error: MSG.POINT_NOT_FOUND })
      }

      return res.status(200).json(points)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const point = await this.pointRepository.create(req.body)
      res.status(201).json(point)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
