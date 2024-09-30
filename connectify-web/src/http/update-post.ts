import { api } from '@/lib'
import { Post } from '@/@types'

type UpdatePostRequest = {
  body: string
  title: string
  id: number
  author: string
  userId: string
  createdAt: string
}

type UpdatePostResponse = {
  post: Post
}

export async function updatePost({
  body,
  title,
  author,
  createdAt,
  id: postId,
  userId,
}: UpdatePostRequest): Promise<UpdatePostResponse> {
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
