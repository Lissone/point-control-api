import { EntitySchema } from 'typeorm'

import { ICompany } from '@entities/ICompany'

export const CompanyEntity = new EntitySchema<ICompany>({
  name: 'company',
  columns: {
    cnpj: {
      type: String,
      primary: true // O CNPJ será a chave primária
    },
    name: {
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
    employees: {
      type: 'one-to-many',
      target: 'employee', // Define que o relacionamento é com a entidade 'employee'
      inverseSide: 'company', // Relacionamento inverso em 'employee'
      nullable: true
    }
  }
})
