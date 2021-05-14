import { IAbsence } from '@entities/IAbsence'

import { IAbsenceUseCase } from './IAbsenceUseCase'
import { IAbsenceRepository } from './IAbsenceRepository'

export class AbsenceUseCase implements IAbsenceUseCase {
  repository: IAbsenceRepository

  constructor (repository: IAbsenceRepository) {
    this.repository = repository
  }

  async getAll () : Promise<IAbsence[]> {
    try {
      const absences = await this.repository.getAll()

      return absences
    } catch (err) {
      throw new Error(err)
    }
  }

  async getOne (id: number) : Promise<IAbsence | undefined> {
    try {
      const absence = await this.repository.getOne(id)

      return absence
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (absence: IAbsence) : Promise<IAbsence> {
    try {
      const ret = await this.repository.create(absence)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }

  async update (absence: IAbsence) : Promise<IAbsence> {
    try {
      const ret = await this.repository.update(absence)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }

  async delete (id: number) : Promise<void> {
    try {
       await this.repository.delete(id)
    } catch (err) {
      throw new Error(err)
    }
  }
}