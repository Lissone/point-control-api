import { getRepository, Repository } from 'typeorm'

import { IAbsence } from '@entities/IAbsence'
import { AbsenceEntity } from '@external/database/entities/AbsenceEntity'
import { IAbsenceRepository } from '@useCases/absence/IAbsenceRepository'

export class AbsenceRepository implements IAbsenceRepository {

  private get repository () : Repository<IAbsence> {
    return getRepository(AbsenceEntity)
  }

  async getAll () : Promise<IAbsence[]> {
    const ret = await this.repository.find({ relations: ['employee'] })

    return ret
  }

  async getOne (id: number) : Promise<IAbsence | undefined> {
    const ret = await this.repository.findOne(id, { relations: ['employee'] })

    return ret
  }

  async create (absence: IAbsence) : Promise<IAbsence> {
    const obj = await this.repository.create(absence)

    const ret = await this.repository.save(obj)

    return ret
  }

  async update (absence: IAbsence) : Promise<IAbsence> {
    const ret = await this.repository.save(absence)

    return ret
  }

  async delete (id: number) : Promise<void> {
    await this.repository.delete(id)
  }
}