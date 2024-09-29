import { api } from '@/lib'

type UpdateProfileRequest = {
  email: string
  password: string
  details: string | null
  name: string
  nickname: string
}

type UpdateProfileResponse = void

export async function updateProfile({
  email,
  name,
  nickname,
  password,
  details,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  await api.put('/user', { details, name, nickname, password, email })
}
