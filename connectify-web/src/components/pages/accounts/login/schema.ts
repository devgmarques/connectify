import { z } from 'zod'

export const schemaLoginForm = z.object({
  email: z.string().email({ message: 'Email invalido' }),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos'),
})
