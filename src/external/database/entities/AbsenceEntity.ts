import { EntitySchema } from 'typeorm'

import { IAbsence } from '@entities/IAbsence'

export const AbsenceEntity = new EntitySchema<IAbsence>({
  name: 'absence',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    status: {
      type: Number,
      nullable: false
    },
    type: {
      type: String,
      nullable: false
    },
    description: {
      type: String,
      nullable: true
    },
    startTime: {
      name: 'start_time',
      type: 'datetime2',
      nullable: false
    },
    endTime: {
      name: 'end_time',
      type: 'datetime2',
      nullable: false
    },
    employeeCpf: {
      name: 'employee_cpf',
      type: String,
      nullable: false
    },
    justification: {
      type: String,
      nullable: true
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime2',
      createDate: true
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime2',
      updateDate: true,
    }
  },
  relations: {
    employee: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'employee_cpf'
      }),
      target: 'employee',
      nullable: false
    }
  }
})