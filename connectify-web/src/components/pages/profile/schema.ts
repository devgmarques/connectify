import { z } from 'zod'

export const schemaUpdateProfile = z.object({
  name: z.string().nonempty('O nome deve ser preenchido.'),
  details: z.string(),
  nickname: z
    .string()
    .min(3, 'O nome de usuário deve conter nom mínimo 3 dígitos.'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos.'),
})
