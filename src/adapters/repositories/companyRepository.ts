import { getRepository, Repository } from 'typeorm'

import { CompanyEntity } from '@external/database/entities/CompanyEntity'

import { ICompany } from '@entities/ICompany'
import { ICompanyRepository } from '@interfaces/company'

export class CompanyRepository implements ICompanyRepository {

  private get repository () : Repository<ICompany> {
    return getRepository(CompanyEntity)
  }

  async getAll () : Promise<ICompany[]> {
    return await this.repository.find({ relations: ['employees']})
  }

  async getOne (cnpj: string) : Promise<ICompany | undefined> {
    return await this.repository.findOne(cnpj, { relations: ['employees']})
  }

  async create (dto: ICompany) : Promise<ICompany> {
    const company = this.repository.create(dto)
    return await this.repository.save(company)
  }
}