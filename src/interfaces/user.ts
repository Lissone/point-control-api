import { IUser } from '@entities/IUser'

export enum UserRole {
  GlobalAdmin = 'global.admin',
  Client = 'client'
}

export interface IUserRepository {
  getOneByEmail(email: string) : Promise<IUser | undefined>
  register(user: IUser) : Promise<IUser>
  update(user: IUser) : Promise<IUser>
}