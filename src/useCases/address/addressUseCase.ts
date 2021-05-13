import { IAddress } from '@entities/IAddress'

import { IAddressUseCase } from './IAddressUseCase'
import { IAddressRepository } from './IAddressRepository'



export class AddressUseCase implements IAddressUseCase {
  repository: IAddressRepository

  constructor (repository: IAddressRepository) {
    this.repository = repository
  }

  async getAll () : Promise<IAddress[]> {
    try {
      const adresses = await this.repository.getAll()

      return adresses
    } catch (err) {
      throw new Error(err)
      
    }
  }

  async getOne (id: number) : Promise<IAddress | undefined> {
    try {
      const address = await this.repository.getOne(id)

      return address
    } catch (err) {
      throw new Error(err)
    }
  }

  async create (address: IAddress) : Promise<IAddress> {
    try {
      const { id } = address

      const exists = await this.repository.getOne(id)

      if (exists != null) 
        throw new Error('Address already exists')

      const ret = await this.repository.create(address)

      return ret
    } catch (err) {
      throw new Error(err)
    }
  }
}