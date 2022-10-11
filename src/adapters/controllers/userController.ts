import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { IUserRepository, UserRole } from '@interfaces/user'
import { IEmployeeRepository } from '@interfaces/employee'

const secretKey = process.env.SECRET_KEY

export class UserController {
  readonly userRepository: IUserRepository
  readonly employeeRepository: IEmployeeRepository

  constructor (userRepository: IUserRepository, employeeRepository: IEmployeeRepository) {
    this.userRepository = userRepository
    this.employeeRepository = employeeRepository
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
      const defaultPassword = '123'
      const passwordHashed = await bcrypt.hash(defaultPassword, 5)
      user = await this.userRepository.create({ password: passwordHashed, ...req.body })

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

