import { EntitySchema } from 'typeorm'

import { ICompany } from '@entities/ICompany'

export const CompanyEntity = new EntitySchema<ICompany>({
  name: 'company',
  columns: {
    cnpj: {
      type: String,
      primary: true
    },
    name: {
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
    employees: {
      type: 'one-to-many',
      target: 'employee',
      inverseSide: 'company',
      nullable: true
    }
  }
})
