import { api } from '@/lib/axios'

type RegisterUserRequest = {
  email: string
  name: string
  nickname: string
  password: string
}

type RegisterUserResponse = void

export async function registerUser({
  email,
  name,
  nickname,
  password,
}: RegisterUserRequest): Promise<RegisterUserResponse> {
  await api.post('/user', {
    email,
    name,
    nickname,
    password,
  })
}
