import { IAbsence } from '@entities/IAbsence'

export interface IAbsenceUseCase {
  getAll() : Promise<IAbsence[]>
  getOne(id: number) : Promise<IAbsence | undefined>
  post(absence: IAbsence) : Promise<IAbsence>
  put(absence: IAbsence) : Promise<IAbsence>
  delete(id: number) : Promise<boolean>
}