import { api } from '@/lib/axios'

export async function fetchProfile(nickname: string, token: string) {
  try {
    const user = await api.get(`/users/${nickname.toLowerCase()}/profile`, {
      headers: {
        Authorization: `Bearer ${token.replace(/["]/g, '')}`,
      },
    })

    return user.data
  } catch (error) {
    console.log(error)
  }
}
