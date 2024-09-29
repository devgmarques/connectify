import { Post } from '@/types/post'
import { api } from '@/lib'

type FetchPostsRequest = {
  page: number
}

type FetchPostsResponse = {
  posts: Post[]
}

export async function fetchPosts({
  page,
}: FetchPostsRequest): Promise<FetchPostsResponse> {
  const posts = await api.get(`/posts/fetch?page=${page}`)

  return posts.data
}
