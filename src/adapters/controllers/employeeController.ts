import { Request, Response } from 'express'

import { IEmployeeRepository } from '@interfaces/employee'

export class EmployeeController {
  readonly repository: IEmployeeRepository

  constructor (repository: IEmployeeRepository) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) {
    try {
      const employees = await this.repository.getAll()
      res.status(200).json(employees)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { cpf } = req.params
      const employee = await this.repository.getOne(cpf)
      
      if (!employee) {
        return res.send(404).json({ message: 'Employee not found' })
      }

      res.status(200).json(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { cpf } = req.body
      let employee = await this.repository.getOne(cpf)

      if (employee) {
        return res.status(409).json({ message: 'Employee already exists' })
      }

      employee = await this.repository.create(req.body)
      res.status(201).send(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { cpf } = req.params
      let employee = await this.repository.getOne(cpf)

      if (!employee) {
        return res.send(404).json({ message: 'Employee not found' })
      }

      employee = await this.repository.update(req.body)
      res.status(200).json(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

