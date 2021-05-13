import { IEmployee } from "./IEmployee";

export interface ICompany {
  cnpj: string
  name: string
  createdAt: Date
  updatedAt: Date
  employees?: IEmployee[]
}