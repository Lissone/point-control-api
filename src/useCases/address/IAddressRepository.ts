import { IAddress } from "@entities/IAddress"

export interface IAddressRepository {
  getAll() : Promise<IAddress[]>
  getOne(id: number) : Promise<IAddress | undefined>
  create(address: IAddress) : Promise<IAddress>
}