import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { UserRepository } from '@repositories/userRepository'
import { EmployeeRepository } from '@repositories/employeeRepository'

import { UserController } from '@controllers/userController'

export const userRoutes = Router()

const userRepository = new UserRepository()
const employeeRepository = new EmployeeRepository()

const userController = new UserController(userRepository, employeeRepository)

userRoutes.post('/login', (req, res) => userController.loginEmployee(req, res))
userRoutes.post('/login/admin', (req, res) => userController.loginAdmin(req, res))
userRoutes.post('/register', AuthMiddleware, (req, res) => userController.register(req, res))

userRoutes.get('/recover', AuthMiddleware, (req, res) => userController.recoverInformation(req, res))
userRoutes.put('/change/password', AuthMiddleware, (req, res) => userController.changePasswordEmployee(req, res))
userRoutes.put('/change/password/admin', AuthMiddleware, (req, res) => userController.changePasswordAdmin(req, res))