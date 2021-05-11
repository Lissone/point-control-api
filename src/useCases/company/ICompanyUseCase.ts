import ICompany from "@entities/ICompany";

export default interface ICompanyUseCase {
  getAll() : Promise<ICompany[]>
  getOne(cnpj: string) : Promise<ICompany | undefined>
  post(company: ICompany) : Promise<ICompany>
}