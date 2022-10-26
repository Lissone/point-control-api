import { IEmployee } from '@entities/IEmployee'
import { IUser } from '@entities/IUser'

export const createdUserAccountTemplateMessage = (user: IUser | IEmployee, password: string) => (`
Olá, ${user.name},

Uma conta foi criada no nosso serviço utilizando seus dados, e para acessá-la utilize suas credenciais:

E-mail: ${user.email}
Senha: ${password}

Não se preocupe você poderá trocar sua senha.

Equipe PointControl.
`.trim())

export const resetPasswordTemplateMessage = (user: IUser | IEmployee, code: number) => (`
Olá, ${user.name},

Foi identificado que você quer recuperar a senha de acesso da sua conta (${user.email}).

Código de validação: ${code}

Equipe PointControl.
`.trim())