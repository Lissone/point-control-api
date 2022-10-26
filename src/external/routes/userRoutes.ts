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
userRoutes.post('/reset/password', (req, res) => userController.resetPasswordEmployee(req, res))
userRoutes.post('/reset/password/admin', (req, res) => userController.resetPasswordAdmin(req, res))
userRoutes.get('/validate/token/:token', (req, res) => userController.validateResetPasswordToken(req, res))
userRoutes.post('/validate/identity', (req, res) => userController.validateResetPasswordCode(req, res))


userRoutes.get('/', AuthMiddleware, (req, res) => userController.getAll(req, res))
userRoutes.get('/recover', AuthMiddleware, (req, res) => userController.recoverInformation(req, res))
userRoutes.get('/:email', AuthMiddleware, (req, res) => userController.getOneByEmail(req, res))
userRoutes.post('/', AuthMiddleware, (req, res) => userController.create(req, res))
userRoutes.patch('/change/password', AuthMiddleware, (req, res) => userController.changePasswordEmployee(req, res))
userRoutes.patch('/change/password/admin', AuthMiddleware, (req, res) => userController.changePasswordAdmin(req, res))
userRoutes.put('/:id', AuthMiddleware, (req, res) => userController.update(req, res))