import { api } from '@/lib/axios'

type SearchPostsProps = {
  query: string
  token: string
  page?: number
}

export async function searchPosts({ page, query, token }: SearchPostsProps) {
  try {
    const posts = await api.get('/posts/search', {
      params: {
        page: page ?? 1,
        query: query.toLowerCase() ?? '',
      },
      headers: {
        Authorization: `Bearer ${token.replace(/["]/g, '')}`,
      },
    })

    return posts.data
  } catch (error) {
    console.log(error)
  }
}
