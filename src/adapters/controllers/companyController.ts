import { Request, Response } from 'express'

import { ICompanyUseCase } from '@useCases/company/ICompanyUseCase'

export class CompanyController {
  useCase: ICompanyUseCase

  constructor (useCase: ICompanyUseCase) {
    this.useCase = useCase
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const companies = await this.useCase.getAll()

      res.status(200).json(companies)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { cnpj } = req.params

      const company = await this.useCase.getOne(cnpj)

      if (company == null) {
        res.sendStatus(404)
        return
      }

      res.status(200).json(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const company = await this.useCase.create(req.body)

      res.status(201).send(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

