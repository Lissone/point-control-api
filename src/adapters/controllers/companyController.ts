import { Request, Response } from 'express'

import { ICompanyUseCase } from '@useCases/company/ICompanyUseCase'

export class CompanyController {
  repository: ICompanyUseCase

  constructor (repository: ICompanyUseCase) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const companies = await this.repository.getAll()

      res.json(companies)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { cnpj } = req.params

      const company = await this.repository.getOne(cnpj)

      if (company == null) 
        res.sendStatus(404)

      res.json(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async post (req: Request, res: Response) : Promise<void> {
    try {
      const ret = await this.repository.post(req.body)

      res.status(201).send(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

