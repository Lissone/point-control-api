import ICompany from "@entities/ICompany"

import ICompanyUseCase from "./ICompanyUseCase"
import ICompanyRepository from "./ICompanyRepository"

export class CompanyUseCase implements ICompanyUseCase {
  repository: ICompanyRepository

  constructor (repository: ICompanyRepository) {
    this.repository = repository
  }

  async getAll () : Promise<ICompany[]> {
    try {
      const companies = await this.repository.getAll()

      return companies
    } catch (err) {
      throw new Error(err)
      
    }
  }

  async getOne (cnpj: string) : Promise<ICompany | undefined> {
    try {
      const company = await this.repository.getOne(cnpj)

      return company
    } catch (err) {
      throw new Error(err)
    }
  }

  async post (company: ICompany) : Promise<ICompany> {
    try {
      const { cnpj } = company

      const exists = await this.repository.getOne(cnpj)

      if (exists != null) 
        throw new Error('Company already exists')

      const ret = await this.repository.post(company)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}