import ICompany from '@entities/ICompany'

export default interface ICompanyRepository {
  getAll() : Promise<ICompany[]>
  getOne(cnpj: string) : Promise<ICompany | undefined>
  post(data: ICompany) : Promise<ICompany>
}