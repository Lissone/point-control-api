import { IEmployee } from "./IEmployee";

export interface ICompany {
  cnpj: string,
  name: string,
  employees: IEmployee[],
  createdAt: Date,
  updatedAt: Date
}