import { IPoint } from '@entities/IPoint'

import { IPointUseCase } from './IPointUseCase'
import { IPointRepository } from './IPointRepository'

export class PointUseCase implements IPointUseCase {
  repository: IPointRepository

  constructor (repository: IPointRepository) {
    this.repository = repository
  }

  async getAll () : Promise<IPoint[]> {
    try {
      const points = await this.repository.getAll()

      return points
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne (id: number) : Promise<IPoint | undefined> {
    try {
      const point = await this.repository.getOne(id)

      return point
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (point: IPoint) : Promise<IPoint> {
    try {
      const ret = await this.repository.create(point)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}