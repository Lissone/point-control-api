import { ICompany } from "@entities/ICompany";

export interface ICompanyUseCase {
  getAll() : Promise<ICompany[]>
  getOne(cnpj: string) : Promise<ICompany | undefined>
  post(company: ICompany) : Promise<ICompany>
}