import { z } from 'zod'

export const schemaRegisterForm = z.object({
  name: z.string().nonempty('Nome obrigatório.'),
  nickname: z.string().min(3, 'Mínimo 3 caracteres.'),
  email: z.string().email('Email inválido.'),
  password: z.string().min(6, 'Mínimo 6 caracteres.'),
})
