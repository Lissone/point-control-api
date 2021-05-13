import { IAddress } from "@entities/IAddress"

export interface IAddressUseCase {
  getAll() : Promise<IAddress[]>
  getOne(id: number) : Promise<IAddress | undefined>
  create(address: IAddress) : Promise<IAddress>
}