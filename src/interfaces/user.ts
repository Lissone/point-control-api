import { IUser } from '@entities/IUser'

export enum UserRole {
  GlobalAdmin = 'global.admin',
  Client = 'client'
}

export interface ResetPasswordInfo {
  user: {
    email: string
    type: 'user' | 'employee'
  }
  token: string
  code: number
}

export interface IUserRepository {
  getAll() : Promise<IUser[]>
  getOne(id: string) : Promise<IUser | undefined>
  getOneByEmail(email: string) : Promise<IUser | undefined>
  create(user: IUser) : Promise<IUser>
  update(user: IUser) : Promise<IUser>
}