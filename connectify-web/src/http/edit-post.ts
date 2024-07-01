import { Post } from '@/types/post'
import { api } from '@/lib/axios'

type EditPostRequest = {
  body: string
  title: string
  id: number
  author: string
  userId: string
  createdAt: string
}

type EditPostResponse = {
  post: Post
}

export async function editPost({
  body,
  title,
  author,
  createdAt,
  id: postId,
  userId,
}: EditPostRequest): Promise<EditPostResponse> {
  const post = await api.put(`/me/posts/${postId}`, {
    body,
    title,
    id: postId,
    author,
    createdAt,
    userId,
  })

  return post.data
}
