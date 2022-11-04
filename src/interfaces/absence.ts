import { IAbsence } from '@entities/IAbsence'

export enum AbsenceStatus {
  Negado = 0,
  AguardandoAnalise = 1,
  Aprovado = 2
}

export interface IAbsenceRepository {
  getAll(): Promise<IAbsence[]>
  findByCompanyCnpj(companyCnpj: string): Promise<IAbsence[]>
  findByStatus(status: number): Promise<IAbsence[]>
  getOne(id: number): Promise<IAbsence | undefined>
  create(absence: IAbsence): Promise<IAbsence>
  update(absence: IAbsence): Promise<IAbsence>
  delete(id: number): Promise<void>
}
