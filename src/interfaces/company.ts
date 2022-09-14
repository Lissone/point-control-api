import { ICompany } from '@entities/ICompany'

export interface ICompanyRepository {
  getAll() : Promise<ICompany[]>
  getOne(cnpj: string) : Promise<ICompany | undefined>
  create(company: ICompany) : Promise<ICompany>
}