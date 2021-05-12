import { IEmployee } from "@entities/IEmployee"

import { IEmployeeUseCase } from "./IEmployeeUseCase"
import { IEmployeeRepository } from "./IEmployeeRepository"

export class EmployeeUseCase implements IEmployeeUseCase {
  repository: IEmployeeRepository

  constructor (repository: IEmployeeRepository) {
    this.repository = repository
  }

  async getAll () : Promise<IEmployee[]> {
    try {
      const employees = await this.repository.getAll()

      return employees
    } catch (err) {
      throw new Error(err)
      
    }
  }

  async getOne (cpf: string) : Promise<IEmployee | undefined> {
    try {
      const employee = await this.repository.getOne(cpf)

      return employee
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (employee: IEmployee) : Promise<IEmployee> {
    try {
      const { cpf } = employee

      const exists = await this.repository.getOne(cpf)

      if (exists != null) 
        throw new Error('Employee already exists')

      const ret = await this.repository.create(employee)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}