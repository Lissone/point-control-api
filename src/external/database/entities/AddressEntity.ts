import { EntitySchema } from 'typeorm'

import { IAddress } from '@entities/IAddress'

export const AddressEntity = new EntitySchema<IAddress>({
  name: 'address',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    street: {
      type: String,
      nullable: false
    },
    district: {
      type: String,
      nullable: false
    },
    city: {
      type: String,
      nullable: false
    },
    state: {
      type: String,
      nullable: false
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
      type: 'one-to-one',
      joinColumn: {
        name: 'employee_cpf'
      },
      target: 'employee',
      nullable: false
    }
  }
})
