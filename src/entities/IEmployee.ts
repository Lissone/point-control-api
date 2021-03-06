import { IAbsence } from './IAbsence'
import { IAddress } from './IAddress'
import { ICompany } from './ICompany'
import { IPoint } from './IPoint'

export interface IEmployee {
  cpf: string
  name: string
  email: string
  password: string
  dtBirth: Date
  entry: Date
  exit: Date
  workingTime: number
  role: string
  access: number
  companyCnpj?: string
  createdAt: Date
  updatedAt: Date
  company?: ICompany
  address?: IAddress
  absences?: IAbsence[]
  points?: IPoint[]
}