import { IEmployeeRepository } from 'src/interfaces/employee'
import { getRepository, Repository } from 'typeorm'

import { EmployeeEntity } from '@external/database/entities/EmployeeEntity'

import { IEmployee } from '@entities/IEmployee'

export class EmployeeRepository implements IEmployeeRepository {
  private get repository(): Repository<IEmployee> {
    return getRepository(EmployeeEntity)
  }

  async getAll(): Promise<IEmployee[]> {
    return this.repository.find({
      relations: ['company', 'address', 'absences', 'points']
    })
  }

  async findByCompanyCnpj(companyCnpj: string): Promise<IEmployee[]> {
    return this.repository.find({
      where: { companyCnpj },
      relations: ['company', 'address', 'absences', 'points']
    })
  }

  async getOne(cpf: string): Promise<IEmployee | undefined> {
    return this.repository.findOne(cpf, {
      relations: ['company', 'address', 'absences', 'points']
    })
  }

  async getOneByEmail(email: string): Promise<IEmployee | undefined> {
    return this.repository.findOne({
      where: { email },
      relations: ['company', 'address', 'absences', 'points']
    })
  }

  async create(dto: IEmployee): Promise<IEmployee> {
    const employee = this.repository.create(dto)
    return this.repository.save(employee)
  }

  async update(employee: IEmployee): Promise<IEmployee> {
    return this.repository.save(employee)
  }
}
