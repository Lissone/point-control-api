import { getRepository, Repository } from "typeorm"

import { PointEntity } from "@external/database/entities/PointEntity"

import { IPoint } from "@entities/IPoint"
import { IPointRepository } from "@interfaces/point"


export class PointRepository implements IPointRepository {

  private get repository () : Repository<IPoint> {
    return getRepository(PointEntity)
  }

  async getAll () : Promise<IPoint[]> {
    return await this.repository.find({ relations: ['employee'] })
  }

  async getOne (id: number) : Promise<IPoint | undefined> {
    return await this.repository.findOne(id, { relations: ['employee'] })
  }

  async create (dto: IPoint) : Promise<IPoint> {
    const point = this.repository.create(dto)
    return await this.repository.save(point)
  }
}