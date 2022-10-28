import { JwtPayload } from 'jsonwebtoken'

import { ICompany } from './ICompany'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: string
  firstAccess: boolean
  companyCnpj?: string | null
  createdAt: Date
  updatedAt: Date
  company?: ICompany
}

export interface UserDecodedPayload extends JwtPayload {
  cpf: string | null
  name: string
  email: string
  role: string
}
