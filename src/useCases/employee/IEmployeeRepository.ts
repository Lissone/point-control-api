import { IEmployee } from "@entities/IEmployee";

export interface IEmployeeRepository {
  getAll() : Promise<IEmployee[]>
  getOne(cpf: string) : Promise<IEmployee | undefined>
  create(employee: IEmployee) : Promise<IEmployee>
  update(employee: IEmployee) : Promise<IEmployee>
}