import { api } from '@/lib'
import { Follow, Post, User } from '@/@types'

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
