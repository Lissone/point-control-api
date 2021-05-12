import { IEmployee } from "./IEmployee";

export interface ICompany {
  cnpj: string,
  name: string,
  employee: IEmployee[],
  createdAt: Date,
  updatedAt: Date
}