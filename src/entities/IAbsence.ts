import { IEmployee } from './IEmployee'

import { AbsenceStatus } from '@interfaces/absence'

export interface IAbsence {
  id: number
  status: AbsenceStatus
  type: string
  description: string | null
  startTime: Date
  endTime: Date
  employeeCpf: string
  justification: string | null
  createdAt: Date
  updatedAt: Date
  employee: IEmployee
}
