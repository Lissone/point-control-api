import { Request, Response } from 'express'

import { IAbsenceRepository } from '@interfaces/absence'
import { IEmployeeRepository } from '@interfaces/employee'
import { IUserRepository } from '@interfaces/user'

export class AbsenceController {
  absenceRepository: IAbsenceRepository
  employeeRepository: IEmployeeRepository
  userRepository: IUserRepository

  constructor (
    absenceRepository: IAbsenceRepository, 
    employeeRepository: IEmployeeRepository,
    userRepository: IUserRepository
  ) {
    this.absenceRepository = absenceRepository
    this.employeeRepository = employeeRepository
    this.userRepository = userRepository
  }

  async getAll (req: Request, res: Response) {
    try {
      const { userDecoded } = req.body
      
      const user = await this.userRepository.getOneByEmail(userDecoded.email)
      const absences = await (
        user.companyCnpj 
        ? this.absenceRepository.findByCompanyCnpj(user.companyCnpj)
        : this.absenceRepository.getAll()
      )

      if (!absences) {
        return res.status(404).json({ message: 'Absences not found' })
      }

      res.status(200).json(absences)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async findByStatus (req: Request, res: Response) {
    try {
      const { status } = req.params

      const absences = await this.absenceRepository.findByStatus(Number(status))
      if (!absences) {
        return res.status(404).json({ message: 'Absences not found' })
      }

      res.status(200).json(absences)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async getOne (req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ message: 'Absence not found' })
      }

      res.status(200).json(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { employeeCpf } = req.body

      const employee = await this.employeeRepository.getOne(employeeCpf)
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' })
      }

      const absence = await this.absenceRepository.create(req.body)

      res.status(201).json(absence)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ message: 'Absence not found' })
      }

      delete req.body.userDecoded
      const ret = await this.absenceRepository.update({...absence, ...req.body})

      res.status(200).json(ret)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ message: 'Absence not found' })
      }

      await this.absenceRepository.delete(Number(id))
      
      res.sendStatus(200)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

