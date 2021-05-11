import { getRepository, Repository } from 'typeorm'

import { ICompany } from '@entities/ICompany'
import { CompanyEntity } from '@external/database/entities/CompanyEntity'

import { ICompanyRepository } from '@useCases/company/ICompanyRepository'

export class CompanyRepository implements ICompanyRepository {

  private get repository () : Repository<ICompany> {
    return getRepository(CompanyEntity)
  }

  async getAll () : Promise<ICompany[]> {
    const ret = await this.repository.find()

    return ret
  }

  async getOne (cnpj: string) : Promise<ICompany | undefined> {
    const ret = await this.repository.findOne(cnpj)

    return ret
  }

  async post (data: ICompany) : Promise<ICompany> {
    const obj = await this.repository.create(data)

    const ret = await this.repository.save(obj)

    return ret
  }
}