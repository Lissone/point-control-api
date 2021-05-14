import { getRepository, Repository } from "typeorm"

import { IEmployee } from "@entities/IEmployee"
import { EmployeeEntity } from "@external/database/entities/EmployeeEntity"

import { IEmployeeRepository } from "@useCases/employee/IEmployeeRepository"

export class EmployeeRepository implements IEmployeeRepository {

  private get repository () : Repository<IEmployee> {
    return getRepository(EmployeeEntity)
  }

  async getAll () : Promise<IEmployee[]> {
    const ret = await this.repository.find({ relations: ['company', 'address', 'absences', 'points'] })

    return ret
  }

  async getOne (cpf: string) : Promise<IEmployee | undefined> {
    const ret = await this.repository.findOne(cpf, { relations: ['company', 'address', 'absences', 'points'] })

    return ret
  }

  async create (employee: IEmployee) : Promise<IEmployee> {
    const obj = await this.repository.create(employee)

    const ret = await this.repository.save(obj)

    return ret
  }

  async update (employee: IEmployee) : Promise<IEmployee> {
    const ret = await this.repository.save(employee)

    return ret
  }
}