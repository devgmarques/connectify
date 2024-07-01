import { User } from '@/types/user'
import { Post } from '@/types/post'
import { Follow } from '@/types/follow'
import { api } from '@/lib/axios'

type GetProfileRequest = {
  nickname: string
}

type GetProfileResponse = {
  user: User
  posts: Post[]
  follows: Follow
}

export async function getProfile({
  nickname,
}: GetProfileRequest): Promise<GetProfileResponse> {
  const profile = await api.get(`/users/${nickname.toLowerCase()}/profile`)

  return profile.data
}
