import { ICompany } from "./ICompany";

export interface IEmployee {
  cpf: string,
  name: string,
  email: string,
  password: string,
  dtBirth: Date,
  entry: Date,
  exit: Date,
  workingTime: number,
  role: string,
  access: number,
  companyCnpj: string,
  company: ICompany,
  createdAt: Date,
  updatedAt: Date
}