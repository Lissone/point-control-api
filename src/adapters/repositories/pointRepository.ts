import { Between, getRepository, Repository } from 'typeorm'
import { addDays } from 'date-fns'

import { PointEntity } from '@external/database/entities/PointEntity'

import { IPoint } from '@entities/IPoint'

import { IPointRepository } from '@interfaces/point'


export class PointRepository implements IPointRepository {

  private get repository () : Repository<IPoint> {
    return getRepository(PointEntity)
  }
  
  async findByCreatedAt (createdAt: Date) : Promise<IPoint[]> {
    return await this.repository.find({ 
      where: { 
        createdAt: Between(createdAt, addDays(createdAt, 1))
    },
      order: { createdAt: 'DESC' },
      relations: ['employee'] 
    })
  }

  async findByCreatedAtWithCompanyCnpj (createdAt: Date, companyCnpj: string) : Promise<IPoint[]> {
    return await this.repository.find({ 
      where: { 
        createdAt: Between(createdAt, addDays(createdAt, 1)), 
        employee: { companyCnpj } 
    },
      order: { createdAt: 'DESC' },
      relations: ['employee'] 
    })
  }

  async findByEmployeeCpf (employeeCpf: string) : Promise<IPoint[]> {
    return await this.repository.find({ 
      where: { employeeCpf },
      order: { createdAt: 'DESC' },
      relations: ['employee'] 
    })
  }

  async getOne (id: number) : Promise<IPoint | undefined> {
    return await this.repository.findOne(id, { relations: ['employee'] })
  }

  async create (dto: IPoint) : Promise<IPoint> {
    const point = this.repository.create(dto)
    return await this.repository.save(point)
  }
}