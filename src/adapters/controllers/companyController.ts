import { Request, Response } from 'express'

import { ICompanyRepository } from '@interfaces/company'
import { UserRole } from '@interfaces/user'

export class CompanyController {
  readonly repository: ICompanyRepository

  constructor (repository: ICompanyRepository) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) {
    try {
      const companies = await this.repository.getAll()
      res.status(200).json(companies)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { cnpj } = req.params

      const company = await this.repository.getOne(cnpj)
      if (!company) {
        return res.status(404).json({ message: 'Company not found' })
      }

      res.status(200).json(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { userDecoded, cnpj } = req.body
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }

      let company = await this.repository.getOne(cnpj)
      if (company) {
        return res.status(409).json({ message: 'Company already exists' })
      }

      company = await this.repository.create(req.body)

      res.status(201).json(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { cnpj } = req.params
      const { userDecoded } = req.body 
      if (userDecoded.role !== UserRole.GlobalAdmin) {
        return res.status(401).json({ message: 'You do not have permission to perform this action' })
      }

      let company = await this.repository.getOne(cnpj)
      if (!company) {
        return res.status(404).json({ message: 'Company not found' })
      }
      
      delete req.body.userDecoded
      company = await this.repository.update({ ...company, ...req.body })

      res.status(200).json(company)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

