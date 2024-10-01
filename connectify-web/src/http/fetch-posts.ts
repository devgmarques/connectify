import { api } from '@/lib'
import { Post } from '@/@types'

type FetchPostsRequest = {
  page: number
}

type FetchPostsResponse = Post[]

export async function fetchPosts({
  page,
}: FetchPostsRequest): Promise<FetchPostsResponse> {
  const posts = await api.get(`/posts/fetch?page=${page}`)

  return posts.data
}
