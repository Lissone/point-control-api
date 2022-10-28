import { EntitySchema } from 'typeorm'

import { IPoint } from '@entities/IPoint'

export const PointEntity = new EntitySchema<IPoint>({
  name: 'point',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    employeeCpf: {
      name: 'employee_cpf',
      type: String,
      nullable: false
    },
    createdAt: {
      name: 'created_at',
      type: 'datetime2',
      createDate: true
    },
    updatedAt: {
      name: 'updated_at',
      type: 'datetime2',
      updateDate: true
    }
  },
  relations: {
    employee: {
      type: 'many-to-one',
      joinColumn: {
        name: 'employee_cpf'
      },
      target: 'employee',
      nullable: false
    }
  }
})
