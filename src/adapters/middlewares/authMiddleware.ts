import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { UserDecodedPayload } from '@entities/IUser'

import { MSG } from '@shared/msg'

export interface JwtPayload {
  name: string
  email: string
  role: string
  cpf?: string
}

const secretKey = process.env.SECRET_KEY || 'super_secret'

// eslint-disable-next-line consistent-return
export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: MSG.TOKEN_NOT_FOUND })
  }

  const parts = authHeader.split(' ')
  if (!(parts.length === 2)) {
    return res.status(401).json({ error: MSG.TOKEN_INVALID })
  }

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: MSG.TOKEN_MALFORMED })
  }

  jwt.verify(token, secretKey, (err, decoded: UserDecodedPayload) => {
    if (err) return res.status(401).json({ error: MSG.TOKEN_INVALID })

    req.body.userDecoded = {
      cpf: decoded?.cpf,
      name: decoded?.name,
      email: decoded?.email,
      role: decoded?.role
    }

    return next()
  })
}
