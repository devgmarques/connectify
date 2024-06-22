'use client'

import { Toggle } from '@/components/ui/toggle'
import { api } from '@/lib/axios'
import { Post } from '@/types/post'
import { getTokenData } from '@/utils/get-token-data'
import { useEffect, useState } from 'react'
import { PiHeartBold } from 'react-icons/pi'

type ButtonLikeProps = {
  data: Post
}

export function ButtonLike({ data }: ButtonLikeProps) {
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false)

  const { payload } = getTokenData()

  async function handleClick() {
    const response = await api.post(`/posts/${data.id}/likes`)

    setIsPostLiked(response.data.like)
  }

  useEffect(() => {
    const userLikedPost = data.likes.find((item) => item.userId === payload.sub)

    setIsPostLiked(!!userLikedPost)
  }, [data.likes, payload.sub])

  return (
    <Toggle
      aria-pressed={isPostLiked}
      data-state={isPostLiked ? 'on' : 'off'}
      aria-label="Toggle like"
      aria-checked={isPostLiked}
      size="sm"
      onClick={handleClick}
    >
      <PiHeartBold className="text-foreground" />
    </Toggle>
  )
}
