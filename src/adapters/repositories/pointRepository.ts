import { getRepository, Repository } from "typeorm"

import { IPoint } from "@entities/IPoint"
import { PointEntity } from "@external/database/entities/PointEntity"
import { IPointRepository } from "@useCases/point/IPointRepository"

export class PointRepository implements IPointRepository {

  private get repository () : Repository<IPoint> {
    return getRepository(PointEntity)
  }

  async getAll () : Promise<IPoint[]> {
    const ret = await this.repository.find({ relations: ['employee'] })

    return ret
  }

  async getOne (id: number) : Promise<IPoint | undefined> {
    const ret = await this.repository.findOne(id, { relations: ['employee'] })

    return ret
  }

  async create (point: IPoint) : Promise<IPoint> {
    const obj = await this.repository.create(point)

    const ret = await this.repository.save(obj)

    return ret
  }
}