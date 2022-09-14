import { IUser } from '@entities/IUser'

import { EntitySchema } from 'typeorm'

export const UserEntity = new EntitySchema<IUser>({
  name: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
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
    role: {
      type: String,
      nullable: false,
    },
    companyCnpj: {
      name: 'company_cnpj',
      type: String,
      nullable: true,
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
    company: {
      type: 'many-to-one',
      joinColumn: ({
        name: 'company_cnpj'
      }),
      target: 'company',
      nullable: true
    }
  }
})