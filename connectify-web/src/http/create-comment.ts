import { Comment } from '@/types/comment'
import { api } from '@/lib/axios'

type CreateCommentRequest = {
  postId: number
  body: string
}

type CreateCommentResponse = {
  comment: Comment
}

export async function createComment({
  body,
  postId,
}: CreateCommentRequest): Promise<CreateCommentResponse> {
  const comment = await api.post(`/posts/${postId}/comments`, { body })

  return comment.data
}
