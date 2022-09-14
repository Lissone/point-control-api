import { ICompany } from './ICompany'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: string
  companyCnpj?: string
  createdAt: Date
  updatedAt: Date
  company?: ICompany
}