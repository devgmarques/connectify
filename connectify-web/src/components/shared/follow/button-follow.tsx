'use client'

import { useState } from 'react'

import { User } from '@/types/user'
import { createFollow } from '@/http'

type ButtonFollowProps = {
  data: User
  isFollowing?: boolean
}

export function ButtonFollow({ data, isFollowing = false }: ButtonFollowProps) {
  const [isFollowed, setIsFollowed] = useState<boolean>(isFollowing)

  async function handleFollow() {
    const { follow } = await createFollow({ userId: data.id! })

    setIsFollowed(follow)
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
