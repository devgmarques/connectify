import { api } from '@/lib/axios'

type AuthenficateRequest = {
  email: string
  password: string
}

type AuthenficateResponse = {
  token: string
}

export async function authenficate({
  email,
  password,
}: AuthenficateRequest): Promise<AuthenficateResponse> {
  const token = await api.post('/session', {
    email,
    password,
  })

  return token.data
}
