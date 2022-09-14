import { getRepository, Repository } from "typeorm"

import { AddressEntity } from "@external/database/entities/AddressEntity"

import { IAddress } from "@entities/IAddress"
import { IAddressRepository } from "@interfaces/address"

export class AddressRepository implements IAddressRepository {

  private get repository () : Repository<IAddress> {
    return getRepository(AddressEntity)
  }

  async getAll () : Promise<IAddress[]> {
    return await this.repository.find({ relations: ['employee'] })
  }

  async getOne (id: number) : Promise<IAddress | undefined> {
    return await this.repository.findOne(id, { relations: ['employee'] })
  }

  async create (dto: IAddress) : Promise<IAddress> {
    const address = this.repository.create(dto)
    return await this.repository.save(address)
  }
}