import { api } from '@/lib'
import { Comment } from '@/@types'

type CreateCommentRequest = {
  postId: number
  body: string
}

type CreateCommentResponse = Comment

export async function createComment({
  body,
  postId,
}: CreateCommentRequest): Promise<CreateCommentResponse> {
  const comment = await api.post(`/posts/${postId}/comments`, { body })

  return comment.data
}
