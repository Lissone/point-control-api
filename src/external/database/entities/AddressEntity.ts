import { EntitySchema } from 'typeorm'

import { IAddress } from '@entities/IAddress'

export const AddressEntity = new EntitySchema<IAddress>({
  name: 'address',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment' // Ajustado para auto-incremento no PostgreSQL
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
      type: 'timestamp', // Alterado para 'timestamp' para PostgreSQL
      createDate: true // Define que é uma coluna de criação automática
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp', // Alterado para 'timestamp' para PostgreSQL
      updateDate: true // Define que é uma coluna de atualização automática
    }
  },
  relations: {
    employee: {
      type: 'one-to-one',
      target: 'employee', // Refere-se à entidade 'employee' corretamente
      joinColumn: {
        name: 'employee_cpf'
      },
      nullable: false
    }
  }
})
