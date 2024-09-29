import { Post } from '@/types/post'
import { api } from '@/lib'

type CreatePostRequest = {
  body: string
  title: string
}

type CreatePostResponse = {
  post: Post
}

export async function createPost({
  body,
  title,
}: CreatePostRequest): Promise<CreatePostResponse> {
  const post = await api.post('/post', { body, title: title.toLowerCase() })

  return post.data
}
