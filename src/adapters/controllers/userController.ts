import bcrypt from 'bcryptjs'
import { createHash, randomBytes } from 'crypto'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { cache } from '@external/cache'
import { mail } from '@external/mailer'
import { createdUserAccountTemplateMessage, resetPasswordTemplateMessage } from '@external/mailer/templates'

import { JwtPayload } from '@middlewares/authMiddleware'

import { IEmployee } from '@entities/IEmployee'
import { IUser } from '@entities/IUser'

import { MSG } from '@shared/msg'
import { generatePassword, generateRandomCodeNumber } from '@shared/utils'

import { IEmployeeRepository } from '@interfaces/employee'
import { ResetPasswordInfo, IUserRepository, UserRole } from '@interfaces/user'

const secretKey = process.env.SECRET_KEY || 'super_secret'

export class UserController {
  private readonly userRepository: IUserRepository
  private readonly employeeRepository: IEmployeeRepository

  constructor(userRepository: IUserRepository, employeeRepository: IEmployeeRepository) {
    this.userRepository = userRepository
    this.employeeRepository = employeeRepository
  }

  async loginEmployee(req: Request, res: Response) {
    try {
      const { cpf, password } = req.body

      const employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      if (!(await bcrypt.compare(password, employee.password))) {
        return res.status(400).json({ error: MSG.USER_INVALID_PASSWORD })
      }

      const tokenExpires = 60 * 60 * 1 // 1 hour
      const token = jwt.sign(
        {
          cpf: employee.cpf,
          name: employee.name,
          email: employee.email,
          role: employee.role
        },
        secretKey,
        {
          expiresIn: tokenExpires
        }
      )

      return res.status(200).json({ user: employee, token, tokenExpires })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async loginAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: MSG.USER_INVALID_PASSWORD })
      }

      const tokenExpires = 60 * 60 * 1 // 1 hour
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          role: user.role
        },
        secretKey,
        {
          expiresIn: tokenExpires
        }
      )

      return res.status(200).json({ user, token, tokenExpires })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async resetPasswordEmployee(req: Request, res: Response) {
    try {
      const { cpf, email } = req.body

      const employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }
      if (employee.email !== email) {
        return res.status(400).json({ error: MSG.USER_INVALID_EMAIL })
      }

      const cacheKey = 'forgot-password'
      const statusCacheKey = `${cacheKey}=status:${employee.email}`
      const cachedToken = await cache.get<{ token: string }>(statusCacheKey)
      if (cachedToken) {
        return res.status(200).json(cachedToken)
      }

      const code = generateRandomCodeNumber(6)
      const hashedEmail = createHash('md5').update(employee.email).digest('hex')
      const token = `${randomBytes(60).toString('hex')}${hashedEmail.slice(-8)}`
      const tokenExpires = 60 * 2 // 2 minutes

      const resetPasswordInfo: ResetPasswordInfo = {
        user: { email: employee.email, type: 'employee' },
        token,
        code
      }
      await cache.set(statusCacheKey, JSON.stringify({ token }), tokenExpires) // status cache
      await cache.set(`${cacheKey}:${token}`, JSON.stringify(resetPasswordInfo), tokenExpires) // info cache

      await mail.send({
        to: employee.email,
        subject: 'PointControl - Recuperação de senha',
        text: resetPasswordTemplateMessage(employee, code)
      })

      return res.status(200).json({ token })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async resetPasswordAdmin(req: Request, res: Response) {
    try {
      const { name, email } = req.body

      const user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }
      if (user.name !== name) {
        return res.status(400).json({ error: MSG.USER_INVALID_NAME })
      }

      const cacheKey = 'forgot-password'
      const statusCacheKey = `${cacheKey}=status:${user.email}`
      const cachedToken = await cache.get<{ token: string }>(statusCacheKey)
      if (cachedToken) {
        return res.status(200).json(cachedToken)
      }

      const code = generateRandomCodeNumber(6)
      const hashedEmail = createHash('md5').update(user.email).digest('hex')
      const token = `${randomBytes(60).toString('hex')}${hashedEmail.slice(-8)}`
      const tokenExpires = 60 * 2 // 2 minutes

      const resetPasswordInfo: ResetPasswordInfo = {
        user: { email: user.email, type: 'user' },
        token,
        code
      }
      await cache.set(statusCacheKey, JSON.stringify({ token }), tokenExpires) // status cache
      await cache.set(`${cacheKey}:${token}`, JSON.stringify(resetPasswordInfo), tokenExpires) // info cache

      await mail.send({
        to: user.email,
        subject: 'PointControl - Recuperação de senha',
        text: resetPasswordTemplateMessage(user, code)
      })

      return res.status(200).json({ token })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async validateResetPasswordToken(req: Request, res: Response) {
    try {
      const { token } = req.params

      const cacheKey = 'forgot-password'
      const cachedToken = await cache.get<ResetPasswordInfo>(`${cacheKey}:${token}`)
      if (!cachedToken) {
        return res.status(404).json({ error: MSG.USER_RESET_PASSWORD_EXPIRED_TOKEN })
      }

      return res.sendStatus(200)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async validateResetPasswordCode(req: Request, res: Response) {
    try {
      const { token, code } = req.body

      const cacheKey = 'forgot-password'
      const cachedToken = await cache.get<ResetPasswordInfo>(`${cacheKey}:${token}`)
      if (!cachedToken) {
        return res.status(404).json({ error: MSG.USER_RESET_PASSWORD_INVALID_TOKEN })
      }

      if (cachedToken.code !== Number(code)) {
        return res.status(400).json({ error: MSG.USER_RESET_PASSWORD_INVALID_TOKEN })
      }

      let user: IUser | IEmployee
      let jwtPayload: JwtPayload
      if (cachedToken.user.type === 'user') {
        user = await this.userRepository.getOneByEmail(cachedToken.user.email)
        jwtPayload = { name: user.name, email: user.email, role: user.role }
      } else if (cachedToken.user.type === 'employee') {
        user = await this.employeeRepository.getOneByEmail(cachedToken.user.email)
        jwtPayload = {
          cpf: user.cpf,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }

      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      // cria auth jwt token pra enviar usuário logado
      const tokenExpires = 60 * 60 * 1 // 1 hour
      const jwtToken = jwt.sign(jwtPayload, secretKey, {
        expiresIn: tokenExpires
      })

      cache.delete(`${cacheKey}=status:${user.email}`) // deleta status cache
      cache.delete(`${cacheKey}:${token}`) // deleta info cache

      return res.status(200).json({ user, token: jwtToken, tokenExpires })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      const users = await this.userRepository.getAll()
      return res.status(200).json(users)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getOneByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      const user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async recoverInformation(req: Request, res: Response) {
    try {
      const { userDecoded } = req.body

      const user = userDecoded.cpf
        ? await this.employeeRepository.getOne(userDecoded.cpf)
        : await this.userRepository.getOneByEmail(userDecoded.email)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      return res.status(200).json({ user })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userDecoded, email } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let user = await this.userRepository.getOneByEmail(email)
      if (user?.email === email) {
        return res.status(409).json({ error: MSG.COMPANY_ALREADY_EXISTS })
      }

      delete req.body.userDecoded
      const generatedPassword = generatePassword()
      const passwordHashed = await bcrypt.hash(generatedPassword, 5)

      user = await this.userRepository.create({
        password: passwordHashed,
        ...req.body
      })

      await mail.send({
        to: user.email,
        subject: 'PointControl - Usuário admin cadastrado',
        text: createdUserAccountTemplateMessage(user, generatedPassword)
      })

      return res.status(201).json({ user })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async changePasswordAdmin(req: Request, res: Response) {
    try {
      const { userDecoded, newPassword } = req.body

      let user = await this.userRepository.getOneByEmail(userDecoded.email)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 5)
      user = await this.userRepository.update({
        ...user,
        firstAccess: false,
        password: newPasswordHashed
      })

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async changePasswordEmployee(req: Request, res: Response) {
    try {
      const { userDecoded, password: newPassword } = req.body

      let employee = await this.employeeRepository.getOne(userDecoded.cpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 5)
      employee = await this.employeeRepository.update({
        ...employee,
        password: newPasswordHashed
      })

      return res.status(200).json(employee)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let user = await this.userRepository.getOne(id)
      if (!user) {
        return res.status(404).json({ error: MSG.USER_NOT_FOUND })
      }

      delete req.body.userDecoded
      user = await this.userRepository.update({ ...user, ...req.body })

      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
