import { Request, Response } from 'express'

import { IAddressUseCase } from '@useCases/address/IAddressUseCase'

export class AddressController {
  useCase: IAddressUseCase

  constructor (useCase: IAddressUseCase) {
    this.useCase = useCase
  }

  async getAll (req: Request, res: Response) : Promise<void> {
    try {
      const adresses = await this.useCase.getAll()

      res.status(200).json(adresses)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params

      const address = await this.useCase.getOne(Number(id))

      if (address == null) {
        res.sendStatus(404)
        return
      }

      res.status(200).json(address)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) : Promise<void> {
    try {
      const address = await this.useCase.create(req.body)

      res.status(201).send(address)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

