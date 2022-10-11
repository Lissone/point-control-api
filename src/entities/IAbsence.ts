import { AbsenceStatus } from '@interfaces/absence';

import { IEmployee } from './IEmployee';

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