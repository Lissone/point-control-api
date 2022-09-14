import { IPoint } from '@entities/IPoint'

export interface IPointRepository {
  getAll() : Promise<IPoint[]>
  getOne(id: number) : Promise<IPoint | undefined>
  create(point: IPoint) : Promise<IPoint>
}