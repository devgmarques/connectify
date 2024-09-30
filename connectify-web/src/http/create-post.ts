import { api } from '@/lib'
import { Post } from '@/@types'

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
