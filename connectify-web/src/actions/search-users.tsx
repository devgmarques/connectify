import { api } from '@/lib/axios'

type SearchUsersProps = {
  query: string
  page?: number
}

export async function searchUsers({ page, query }: SearchUsersProps) {
  try {
    const users = await api.get('/users/search', {
      params: {
        query: query.toLowerCase(),
        page: page ?? 1,
      },
    })

    return users.data
  } catch (error) {}
}
