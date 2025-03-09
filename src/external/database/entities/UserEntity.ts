import { EntitySchema } from 'typeorm'

import { IUser } from '@entities/IUser'

export const UserEntity = new EntitySchema<IUser>({
  name: 'user',
  columns: {
    id: {
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
      unique: true // Garante que o email seja único
    },
    password: {
      type: String,
      nullable: false
    },
    role: {
      type: String,
      nullable: false
    },
    firstAccess: {
      name: 'first_access',
      type: Boolean,
      nullable: false
    },
    companyCnpj: {
      name: 'company_cnpj',
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
    company: {
      type: 'many-to-one',
      joinColumn: {
        name: 'company_cnpj'
      },
      target: 'company',
      nullable: true
    }
  }
})
