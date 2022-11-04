import { IEmployee } from './IEmployee'

export interface IPoint {
  id: number
  employeeCpf: string
  createdAt: Date
  updatedAt: Date
  employee: IEmployee
}
