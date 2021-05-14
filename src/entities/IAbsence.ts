import { IEmployee } from './IEmployee';

export interface IAbsence {
  id: number
  type: string
  description: string
  startTime: Date
  endTime: Date
  employeeCpf: string
  createdAt: Date
  updatedAt: Date
  employee: IEmployee
}