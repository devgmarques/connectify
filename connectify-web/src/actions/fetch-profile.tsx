import { api } from '@/lib/axios'

export async function fetchProfile(nickname: string) {
  try {
    const user = await api.get(`/users/${nickname.toLowerCase()}/profile`)

    return user.data
  } catch (error) {}
}
