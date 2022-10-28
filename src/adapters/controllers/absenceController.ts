import { Request, Response } from 'express'

import { MSG } from '@shared/msg'

import { IAbsenceRepository } from '@interfaces/absence'
import { IEmployeeRepository } from '@interfaces/employee'
import { IUserRepository } from '@interfaces/user'

export class AbsenceController {
  private readonly absenceRepository: IAbsenceRepository
  private readonly employeeRepository: IEmployeeRepository
  private readonly userRepository: IUserRepository

  constructor(
    absenceRepository: IAbsenceRepository,
    employeeRepository: IEmployeeRepository,
    userRepository: IUserRepository
  ) {
    this.absenceRepository = absenceRepository
    this.employeeRepository = employeeRepository
    this.userRepository = userRepository
  }

  async getAll(req: Request, res: Response) {
    try {
      const { userDecoded } = req.body

      const user = await this.userRepository.getOneByEmail(userDecoded.email)
      const absences = await (user.companyCnpj
        ? this.absenceRepository.findByCompanyCnpj(user.companyCnpj)
        : this.absenceRepository.getAll())

      if (!absences) {
        return res.status(404).json({ error: MSG.ASBENCE_NOT_FOUND })
      }

      return res.status(200).json(absences)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async findByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params

      const absences = await this.absenceRepository.findByStatus(Number(status))
      if (!absences) {
        return res.status(404).json({ error: MSG.ASBENCE_NOT_FOUND })
      }

      return res.status(200).json(absences)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ error: MSG.ASBENCE_NOT_FOUND })
      }

      return res.status(200).json(absence)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { employeeCpf } = req.body

      const employee = await this.employeeRepository.getOne(employeeCpf)
      if (!employee) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      const absence = await this.absenceRepository.create(req.body)
      return res.status(201).json(absence)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      delete req.body.userDecoded
      const ret = await this.absenceRepository.update({
        ...absence,
        ...req.body
      })

      return res.status(200).json(ret)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const absence = await this.absenceRepository.getOne(Number(id))
      if (!absence) {
        return res.status(404).json({ error: MSG.EMPLOYEE_NOT_FOUND })
      }

      await this.absenceRepository.delete(Number(id))
      return res.sendStatus(200)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
