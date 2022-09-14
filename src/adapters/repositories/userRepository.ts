import { getRepository, Repository } from "typeorm"
import { v4 as uuidv4 } from "uuid"

import { UserEntity } from "@external/database/entities/UserEntity"

import { IUser } from '@entities/IUser'
import { IUserRepository } from "@interfaces/user"

export class UserRepository implements IUserRepository {
  private get repository () : Repository<IUser> {
    return getRepository(UserEntity)
  }

  async getOneByEmail (email: string) {
    return await this.repository.findOne({ where: { email }})
  }

  async update (user: IUser) {
    return await this.repository.save(user)
  }

  async register (dto: IUser) {
    const user = this.repository.create({ id: uuidv4(), ...dto })
    return await this.repository.save(user)
  }
}