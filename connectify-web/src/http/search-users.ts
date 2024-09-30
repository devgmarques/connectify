import { api } from '@/lib'
import { User } from '@/@types'

type SearchUsersRequest = {
  query: string
  page?: number
}

type SearchUsersResponse = {
  users: User[]
  meta: {
    countUsers: number
  }
}

export async function searchUsers({
  query,
  page = 1,
}: SearchUsersRequest): Promise<SearchUsersResponse> {
  const users = await api.get('/users/search', {
    params: {
      query: query.toLowerCase(),
      page,
    },
  })

  return users.data
}
