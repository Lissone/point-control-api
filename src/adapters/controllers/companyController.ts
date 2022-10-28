import { Request, Response } from 'express'

import { MSG } from '@shared/msg'

import { ICompanyRepository } from '@interfaces/company'
import { UserRole } from '@interfaces/user'

export class CompanyController {
  private readonly repository: ICompanyRepository

  constructor(repository: ICompanyRepository) {
    this.repository = repository
  }

  async getAll(req: Request, res: Response) {
    try {
      const companies = await this.repository.getAll()
      return res.status(200).json(companies)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { cnpj } = req.params

      const company = await this.repository.getOne(cnpj)
      if (!company) {
        return res.status(404).json({ error: MSG.COMPANY_NOT_FOUND })
      }

      return res.status(200).json(company)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userDecoded, cnpj } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let company = await this.repository.getOne(cnpj)
      if (company) {
        return res.status(409).json({ error: MSG.COMPANY_ALREADY_EXISTS })
      }

      company = await this.repository.create(req.body)

      return res.status(201).json(company)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { cnpj } = req.params
      const { userDecoded } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ error: MSG.NO_PERMISSION })
      }

      let company = await this.repository.getOne(cnpj)
      if (!company) {
        return res.status(404).json({ error: MSG.COMPANY_ALREADY_EXISTS })
      }

      delete req.body.userDecoded
      company = await this.repository.update({ ...company, ...req.body })

      return res.status(200).json(company)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
