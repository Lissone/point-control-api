import { IAbsence } from '@entities/IAbsence'

export interface IAbsenceUseCase {
  getAll() : Promise<IAbsence[]>
  getOne(id: number) : Promise<IAbsence | undefined>
  create(absence: IAbsence) : Promise<IAbsence>
  update(absence: IAbsence) : Promise<IAbsence>
  delete(id: number) : Promise<void>
}