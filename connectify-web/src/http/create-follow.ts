import { api } from '@/lib'

type CreateFollowRequest = {
  userId: string
}

type CreateFollowResponse = {
  follow: boolean
}

export async function createFollow({
  userId,
}: CreateFollowRequest): Promise<CreateFollowResponse> {
  const follow = await api.post(`/users/${userId}/follows`)

  return follow.data
}
