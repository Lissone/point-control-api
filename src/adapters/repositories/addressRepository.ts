import { getRepository, Repository } from "typeorm"

import { IAddress } from "@entities/IAddress"
import { AddressEntity } from "@external/database/entities/AddressEntity"
import { IAddressRepository } from "@useCases/address/IAddressRepository"

export class AddressRepository implements IAddressRepository {

  private get repository () : Repository<IAddress> {
    return getRepository(AddressEntity)
  }

  async getAll () : Promise<IAddress[]> {
    const ret = await this.repository.find({ relations: ['employee'] })

    return ret
  }

  async getOne (id: number) : Promise<IAddress | undefined> {
    const ret = await this.repository.findOne(id, { relations: ['employee'] })

    return ret
  }

  async create (address: IAddress) : Promise<IAddress> {
    const obj = await this.repository.create(address)

    const ret = await this.repository.save(obj)

    return ret
  }
}