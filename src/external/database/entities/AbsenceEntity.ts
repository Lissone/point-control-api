import { EntitySchema } from 'typeorm'

import { IAbsence } from '@entities/IAbsence'

export const AbsenceEntity = new EntitySchema<IAbsence>({
  name: 'absence',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: 'increment' // Ajustado para auto incremento no PostgreSQL
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
      type: 'timestamp', // Alterado para 'timestamp' para PostgreSQL
      nullable: false
    },
    endTime: {
      name: 'end_time',
      type: 'timestamp', // Alterado para 'timestamp' para PostgreSQL
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
      type: 'many-to-one',
      target: 'employee',
      joinColumn: {
        name: 'employee_cpf'
      },
      nullable: false
    }
  }
})
