import { Router } from "express"

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { AddressRepository } from "@repositories/addressRepository"
import { AddressController } from "@controllers/addressController"

export const addressRoutes = Router()

const addressRepository = new AddressRepository()
const addressController = new AddressController(addressRepository)

addressRoutes.get('/', AuthMiddleware, (req, res) => addressController.getAll(req, res))
addressRoutes.get('/:id', AuthMiddleware, (req, res) => addressController.getOne(req, res))
addressRoutes.post('/', AuthMiddleware, (req, res) => addressController.create(req, res))