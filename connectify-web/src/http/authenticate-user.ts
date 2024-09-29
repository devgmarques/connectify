import { api } from '@/lib'

type AuthenticateRequest = {
  email: string
  password: string
}

type AuthenticateResponse = {
  token: string
}

export async function authenticate({
  email,
  password,
}: AuthenticateRequest): Promise<AuthenticateResponse> {
  const token = await api.post('/session', {
    email,
    password,
  })

  return token.data
}
