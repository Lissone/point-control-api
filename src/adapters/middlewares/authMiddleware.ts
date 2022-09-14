import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const secretKey = process.env.SECRET_KEY

function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ')
  if (!(parts.length === 2)) {
    return res.status(401).json({ error: 'Token error' })
  }

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformed' })
  }

  jwt.verify(token, secretKey!, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' })
    req.body.userDecoded = {
      cpf: decoded?.cpf,
      name: decoded?.name,
      email: decoded?.email,
      role: decoded?.role,
    }
    return next()
  })
}

export { AuthMiddleware }
