import { getRepository, Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { UserEntity } from '@external/database/entities/UserEntity'

import { IUser } from '@entities/IUser'
import { IUserRepository } from '@interfaces/user'

export class UserRepository implements IUserRepository {
  private get repository () : Repository<IUser> {
    return getRepository(UserEntity)
  }

  async getAll () : Promise<IUser[]> {
    return await this.repository.find({ relations: ['company']})
  }

  async getOne (id: string) : Promise<IUser | undefined> {
    return await this.repository.findOne(id, { relations: ['company']})
  }

  async getOneByEmail (email: string) : Promise<IUser | undefined> {
    return await this.repository.findOne({ where: { email },  relations: ['company']})
  }

  async create (dto: IUser) : Promise<IUser> {
    const user = this.repository.create({ id: uuidv4(), firstAccess: true, ...dto })
    return await this.repository.save(user)
  }

  async update (user: IUser) : Promise<IUser> {
    return await this.repository.save(user)
  }
}