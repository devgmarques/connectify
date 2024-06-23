import { api } from '@/lib/axios'

type SearchUsersProps = {
  query: string
  token: string
  page?: number
}

export async function searchUsers({ page, query, token }: SearchUsersProps) {
  try {
    const users = await api.get('/users/search', {
      params: {
        query: query.toLowerCase() ?? '',
        page: page ?? 1,
      },
      headers: {
        Authorization: `Bearer ${token.replace(/["]/g, '')}`,
      },
    })

    return users.data
  } catch (error) {
    console.error(error)
  }
}
