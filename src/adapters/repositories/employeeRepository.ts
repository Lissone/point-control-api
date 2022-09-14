import { getRepository, Repository } from "typeorm"

import { EmployeeEntity } from "@external/database/entities/EmployeeEntity"

import { IEmployee } from "@entities/IEmployee"
import { IEmployeeRepository } from "@interfaces/employee"

export class EmployeeRepository implements IEmployeeRepository {

  private get repository () : Repository<IEmployee> {
    return getRepository(EmployeeEntity)
  }

  async getAll () : Promise<IEmployee[]> {
    return await this.repository.find({ relations: ['company', 'address', 'absences', 'points'] })
  }

  async getOne (cpf: string) : Promise<IEmployee | undefined> {
    return await this.repository.findOne(cpf, { relations: ['company', 'address', 'absences', 'points'] })
  }

  async create (dto: IEmployee) : Promise<IEmployee> {
    const employee = this.repository.create(dto)
    return await this.repository.save(employee)
  }

  async update (employee: IEmployee) : Promise<IEmployee> {
    return await this.repository.save(employee)
  }
}