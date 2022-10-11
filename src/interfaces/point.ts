import { IPoint } from '@entities/IPoint'

export interface IPointRepository {
  findByCreatedAt(createdAt: Date) : Promise<IPoint[]>
  findByCreatedAtWithCompanyCnpj(createdAt: Date, companyCnpj: string) : Promise<IPoint[]> 
  findByEmployeeCpf(employeeCpf: string) : Promise<IPoint[]>
  getOne(id: number) : Promise<IPoint | undefined>
  create(point: IPoint) : Promise<IPoint>
}