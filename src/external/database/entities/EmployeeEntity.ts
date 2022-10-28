import { EntitySchema } from 'typeorm'

import { IEmployee } from '@entities/IEmployee'

export const EmployeeEntity = new EntitySchema<IEmployee>({
  name: 'employee',
  columns: {
    cpf: {
      type: String,
      primary: true
    },
    name: {
      type: String,
      nullable: false
    },
    email: {
      type: String,
      nullable: false,
      unique: true
    },
    password: {
      type: String,
      nullable: false
    },
    dtBirth: {
      name: 'birthday_date',
      type: 'datetime2'
    },
    entry: {
      type: String,
      nullable: false
    },
    exit: {
      type: String,
      nullable: false
    },
    workingTime: {
      name: 'working_time',
      type: Number,
      nullable: false
    },
    role: {
      type: String,
      nullable: false
    },
    companyCnpj: {
      name: 'company_cnpj',
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
      updateDate: true
    }
  },
  relations: {
    company: {
      type: 'many-to-one',
      joinColumn: {
        name: 'company_cnpj'
      },
      target: 'company',
      nullable: true
    },
    address: {
      type: 'one-to-one',
      target: 'address',
      inverseSide: 'employee',
      onUpdate: 'CASCADE',
      cascade: true,
      nullable: true
    },
    absences: {
      type: 'one-to-many',
      target: 'absence',
      inverseSide: 'employee',
      nullable: true
    },
    points: {
      type: 'one-to-many',
      target: 'point',
      inverseSide: 'employee',
      nullable: true
    }
  }
})
