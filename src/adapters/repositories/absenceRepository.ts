import { getRepository, Repository } from 'typeorm'

import { AbsenceEntity } from '@external/database/entities/AbsenceEntity'

import { IAbsence } from '@entities/IAbsence'
import { IAbsenceRepository } from '@interfaces/absence'

export class AbsenceRepository implements IAbsenceRepository {

  private get repository () : Repository<IAbsence> {
    return getRepository(AbsenceEntity)
  }

  async getAll () : Promise<IAbsence[]> {
    return await this.repository.find({ relations: ['employee'] })
  }

  async getOne (id: number) : Promise<IAbsence | undefined> {
    return await this.repository.findOne(id, { relations: ['employee'] })
  }

  async create (dto: IAbsence) : Promise<IAbsence> {
    const absence = this.repository.create(dto)
    return await this.repository.save(absence)
  }

  async update (absence: IAbsence) : Promise<IAbsence> {
    return await this.repository.save(absence)
  }

  async delete (id: number) : Promise<void> {
    await this.repository.delete(id)
  }
}