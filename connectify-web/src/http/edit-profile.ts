import { api } from '@/lib/axios'

type EditProfileRequest = {
  email: string
  password: string
  details: string | null
  name: string
  nickname: string
}

type EditProfileResponse = void

export async function editProfile({
  email,
  name,
  nickname,
  password,
  details,
}: EditProfileRequest): Promise<EditProfileResponse> {
  await api.put('/user', { details, name, nickname, password, email })
}
