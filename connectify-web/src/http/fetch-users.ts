import { User } from '@/types/user'
import { api } from '@/lib'

type FetchUsersResponse = {
  users: User[]
}

export async function fetchUsers(): Promise<FetchUsersResponse> {
  const users = await api.get('/users/fetch')

  return users.data
}
