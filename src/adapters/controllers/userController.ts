import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { createHash, randomBytes } from 'crypto'

import { cache } from '@external/cache'
import { mail } from '@external/mailer'
import { createdUserAccountTemplateMessage, resetPasswordTemplateMessage } from '@external/mailer/templates'

import { JwtPayload } from '@middlewares/authMiddleware'

import { IUser } from '@entities/IUser'
import { IEmployee } from '@entities/IEmployee'

import { ResetPasswordInfo, IUserRepository, UserRole } from '@interfaces/user'
import { IEmployeeRepository } from '@interfaces/employee'

import { generatePassword, generateRandomCodeNumber } from '@shared/utils'

const secretKey = process.env.SECRET_KEY

export class UserController {
  readonly userRepository: IUserRepository
  readonly employeeRepository: IEmployeeRepository

  constructor (userRepository: IUserRepository, employeeRepository: IEmployeeRepository) {
    this.userRepository = userRepository
    this.employeeRepository = employeeRepository
  }

  async loginEmployee (req: Request, res: Response) {
    try {
      const { cpf, password } = req.body

      const employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (!await bcrypt.compare(password, employee.password)) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      const tokenExpires = 60 * 60 * 1 // 1 hour
      const token = jwt.sign({
        cpf: employee.cpf,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }, secretKey!, {
        expiresIn: tokenExpires
      })

      res.status(200).json({ user: employee, token, tokenExpires })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async loginAdmin (req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      const tokenExpires = 60 * 60 * 1 // 1 hour
      const token = jwt.sign({
        name: user.name,
        email: user.email,
        role: user.role
      }, secretKey!, {
        expiresIn: tokenExpires
      })

      res.status(200).json({ user, token, tokenExpires })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async resetPasswordEmployee (req: Request, res: Response) {
    try {
      const { cpf, email } = req.body

      let employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ message: 'User not found' })
      }
      if (employee.email !== email) {
        return res.status(400).json({ message: 'E-mail inválido' })
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

      res.status(200).json({ token })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async resetPasswordAdmin (req: Request, res: Response) {
    try {
      const { name, email } = req.body

      let user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      if (user.name !== name) {
        return res.status(400).json({ message: 'Nome inválido' })
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

      res.status(200).json({ token })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async validateResetPasswordToken (req: Request, res: Response) {
    try {
      const { token } = req.params

      const cacheKey = 'forgot-password'
      const cachedToken = await cache.get<ResetPasswordInfo>(`${cacheKey}:${token}`)
      if (!cachedToken) {
        return res.status(404).json({ message: 'Código expirado!' })
      }

      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async validateResetPasswordCode (req: Request, res: Response) {
    try {
      const { token, code } = req.body

      const cacheKey = 'forgot-password'
      const cachedToken = await cache.get<ResetPasswordInfo>(`${cacheKey}:${token}`)
      if (!cachedToken) {
        return res.status(404).json({ message: 'Código expirado!' })
      }

      if (cachedToken.code !== Number(code)) {
        return res.status(409).json({ message: 'Código inválido' })
      }

      let user: IUser | IEmployee
      let jwtPayload: JwtPayload
      if (cachedToken.user.type === 'user') {
        user = await this.userRepository.getOneByEmail(cachedToken.user.email)
        jwtPayload = { name: user.name, email: user.email, role: user.role }
      } else if (cachedToken.user.type === 'employee') {
        user = await this.employeeRepository.getOneByEmail(cachedToken.user.email)
        jwtPayload = { cpf: user.cpf, name: user.name, email: user.email, role: user.role }
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // cria auth jwt token pra enviar usuário logado
      const tokenExpires = 60 * 60 * 1 // 1 hour
      const jwtToken = jwt.sign(jwtPayload, secretKey!, {
        expiresIn: tokenExpires
      })

      cache.delete(`${cacheKey}=status:${user.email}`) // deleta status cache
      cache.delete(`${cacheKey}:${token}`) // deleta info cache

      res.status(200).json({ user, token: jwtToken, tokenExpires })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }

      const users = await this.userRepository.getAll()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOneByEmail (req: Request, res: Response) {
    try {
      const { email } = req.params
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }

      const user = await this.userRepository.getOneByEmail(email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async recoverInformation (req: Request, res: Response) {
    try {
      const { userDecoded } = req.body

      const user = userDecoded.cpf 
        ? await this.employeeRepository.getOne(userDecoded.cpf)
        : await this.userRepository.getOneByEmail(userDecoded.email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({ user })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { userDecoded, email } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }
      
      let user = await this.userRepository.getOneByEmail(email)
      if (user?.email === email) {
        return res.status(409).json({ message: 'User already exists' })
      }

      delete req.body.userDecoded
      const generatedPassword = generatePassword()
      const passwordHashed = await bcrypt.hash(generatedPassword, 5)

      user = await this.userRepository.create({ password: passwordHashed, ...req.body })

      await mail.send({
        to: user.email,
        subject: 'PointControl - Usuário admin cadastrado',
        text: createdUserAccountTemplateMessage(user, generatedPassword)
      })

      res.status(201).json({ user })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async changePasswordAdmin (req: Request, res: Response) {
    try {
      const { userDecoded, newPassword } = req.body

      let user = await this.userRepository.getOneByEmail(userDecoded.email)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 5)
      user = await this.userRepository.update({
        ...user, firstAccess: false, password: newPasswordHashed
      })

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async changePasswordEmployee (req: Request, res: Response) {
    try {
      const { userDecoded, password: newPassword } = req.body

      let employee = await this.employeeRepository.getOne(userDecoded.cpf)
      if (!employee) {
        return res.status(404).json({ message: 'User not found' })
      }

      const newPasswordHashed = await bcrypt.hash(newPassword, 5)
      employee = await this.employeeRepository.update({
        ...employee, password: newPasswordHashed
      })
      
      res.status(200).json(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { userDecoded } = req.body 
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }

      let user = await this.userRepository.getOne(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      
      delete req.body.userDecoded
      user = await this.userRepository.update({ ...user, ...req.body })

      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

