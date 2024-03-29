import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

import { mail } from '@external/mailer'
import { createdUserAccountTemplateMessage } from '@external/mailer/templates'

import { MSG } from '@shared/msg'
import { generatePassword } from '@shared/utils'

import { IEmployeeRepository } from '@interfaces/employee'
import { IUserRepository, UserRole } from '@interfaces/user'

export class EmployeeController {
  private readonly employeeRepository: IEmployeeRepository
  private readonly userRepository: IUserRepository

  constructor(employeeRepository: IEmployeeRepository, userRepository: IUserRepository) {
    this.employeeRepository = employeeRepository
    this.userRepository = userRepository
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userDecoded } = req.body

      const user = await this.userRepository.getOneByEmail(userDecoded.email)
      const employees = await (user.companyCnpj
        ? this.employeeRepository.findByCompanyCnpj(user.companyCnpj)
        : this.employeeRepository.getAll())

      if (!employees) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      return res.status(200).json(employees)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async findByCompanyCnpj(req: Request, res: Response) {
    try {
      const { cnpj } = req.params

      const employees = await this.employeeRepository.findByCompanyCnpj(cnpj)
      if (!employees) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      return res.status(200).json(employees)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { cpf } = req.params

      const employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      return res.status(200).json(employee)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userDecoded, cpf } = req.body
      if (userDecoded.role === UserRole.Client) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let employee = await this.employeeRepository.getOne(cpf)
      if (employee) {
        return res.status(409).json({ error: MSG.EMPLOYEE_ALREADY_EXISTS })
      }

      delete req.body.userDecoded
      const generatedPassword = generatePassword()
      const passwordHashed = await bcrypt.hash(generatedPassword, 5)

      employee = await this.employeeRepository.create({ password: passwordHashed, ...req.body })

      await mail.send({
        to: employee.email,
        subject: 'PointControl - Usuário cadastrado',
        text: createdUserAccountTemplateMessage(employee, generatedPassword)
      })

      return res.status(201).json({ user: employee })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { cpf } = req.params
      const { userDecoded } = req.body
      if (userDecoded.role === UserRole.Client) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let employee = await this.employeeRepository.getOne(cpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      let address = null
      if (req.body.address) {
        address = {
          ...employee.address,
          ...req.body.address
        }
        delete req.body.address
      }

      delete req.body.userDecoded
      employee = await this.employeeRepository.update({ ...employee, ...req.body, address })

      return res.status(200).json(employee)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
