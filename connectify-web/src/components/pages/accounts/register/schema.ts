import { z } from 'zod'

export const schemaRegisterForm = z.object({
  name: z.string().nonempty('O nome deve ser preenchido.'),
  nickname: z
    .string()
    .min(3, 'O nome de usuário deve conter nom mínimo 3 dígitos.'),
  email: z.string().email({ message: 'Email invalido.' }),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos.'),
})
