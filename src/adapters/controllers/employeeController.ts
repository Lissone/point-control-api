import { Request, Response } from 'express'

import { IEmployeeUseCase } from '@useCases/employee/IEmployeeUseCase'

export class EmployeeController {
  useCase: IEmployeeUseCase

  constructor (useCase: IEmployeeUseCase) {
    this.useCase = useCase
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const employees = await this.useCase.getAll()

      res.json(employees)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { cpf } = req.params

      const employee = await this.useCase.getOne(cpf)

      if (employee == null) 
        res.sendStatus(404)

      res.json(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const ret = await this.useCase.create(req.body)

      res.status(201).send(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

