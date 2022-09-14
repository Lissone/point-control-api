import { Request, Response } from 'express'

import { IAddressRepository } from '@interfaces/address'

export class AddressController {
  repository: IAddressRepository

  constructor (repository: IAddressRepository) {
    this.repository = repository
  }

  async getAll (req: Request, res: Response) {
    try {
      const adresses = await this.repository.getAll()
      res.status(200).json(adresses)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params
      const address = await this.repository.getOne(Number(id))

      if (!address) {
        return res.status(404).json({ message: 'Address not found' })
      }

      res.status(200).json(address)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { id } = req.body
      let address = await this.repository.getOne(id)

      if (address) {
        return res.status(409).json({ message: 'Address already exists' })
      }

      address = await this.repository.create(req.body)
      res.status(201).send(address)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

