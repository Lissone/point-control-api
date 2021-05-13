import { Router } from "express"

import { AddressRepository } from "@repositories/addressRepository"
import { AddressUseCase } from "@useCases/address/addressUseCase"
import { AddressController } from "@controllers/addressController"

const addressRoutes = Router()

const addressRepository = new AddressRepository()
const addressUseCase = new AddressUseCase(addressRepository)
const addressController = new AddressController(addressUseCase)

addressRoutes.get('/', (req, res) => addressController.getAll(req, res))
addressRoutes.get('/:id', (req, res) => addressController.getOne(req, res))
addressRoutes.post('/', (req, res) => addressController.create(req, res))

export { addressRoutes }