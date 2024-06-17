import { api } from '@/lib/axios'
import { User } from '@/types/user'
import { useState } from 'react'

type ButtonFollowProps = {
  data: User
  isFollowing?: boolean
}

export function ButtonFollow({ data, isFollowing = false }: ButtonFollowProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(isFollowing)

  async function handleFollow() {
    const follow = await api.post(`/users/${data.id}/follows`)

    console.log(follow.data)
    setIsFollowed(follow.data.follow)
  }

  return (
    <button
      className={`${isFollowed ? 'text-blue-400 dark:text-blue-300' : 'text-blue-500 dark:text-blue-400 text-md font-bold'}`}
      onClick={handleFollow}
    >
      {isFollowed ? 'Seguindo' : 'Seguir'}
    </button>
  )
}
