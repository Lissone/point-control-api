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

      res.status(200).json(employees)
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

        res.status(200).json(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const employee = await this.useCase.create(req.body)

      res.status(201).send(employee)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) : Promise<void> {
    try {
      const { cpf } = req.params

      if(cpf !== req.body.cpf)
        res.sendStatus(400)

      const employee = await this.useCase.getOne(cpf)

      if (employee == null) 
        res.sendStatus(404)

      const ret = await this.useCase.update(req.body)

      res.status(200).json(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

