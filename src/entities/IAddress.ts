import { IEmployee } from "./IEmployee";

export interface IAddress {
  id: number
  street: string
  district: string
  city: string
  state: string
  createdAt: Date
  updatedAt: Date
  employee?: IEmployee
}