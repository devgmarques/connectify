import { api } from '@/lib/axios'

type CreateLikeRequest = {
  postId: number
}

type CreateLikeResponse = {
  like: boolean
}

export async function createLike({
  postId,
}: CreateLikeRequest): Promise<CreateLikeResponse> {
  const like = await api.post(`/posts/${postId}/likes`)

  return like.data
}
