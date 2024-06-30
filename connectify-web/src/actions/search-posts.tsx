import { api } from '@/lib/axios'

type SearchPostsProps = {
  query: string
  page?: number
}

export async function searchPosts({ page, query }: SearchPostsProps) {
  try {
    const posts = await api.get('/posts/search', {
      params: {
        page: page ?? 1,
        query: query.toLowerCase(),
      },
    })

    return posts.data
  } catch (error) {}
}
