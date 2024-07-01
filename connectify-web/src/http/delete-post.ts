import { api } from '@/lib/axios'

type DeletePostRequest = {
  postId: number
}

type DeletePostResponse = void

export async function deletePost({
  postId,
}: DeletePostRequest): Promise<DeletePostResponse> {
  await api.delete(`/me/posts/${postId}`)
}
