'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { PiHeartBold } from 'react-icons/pi'

import { getTokenData } from '@/utils'
import { createLike } from '@/http'
import { Toggle } from '@/components/ui'
import { Post } from '@/@types'

type ButtonLikeProps = {
  data: Post
  setData: Dispatch<SetStateAction<Post>>
}

export function ButtonLike({ data, setData }: ButtonLikeProps) {
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false)

  async function handleClick() {
    const { like: isLiked } = await createLike({ postId: data.id })

    setData((state) => {
      return {
        ...state,
        _count: {
          ...state._count,
          likes: isLiked ? state._count.likes + 1 : state._count.likes - 1,
        },
      }
    })

    setIsPostLiked(isLiked)
  }

  useEffect(() => {
    async function onLoad() {
      const { sub } = await getTokenData()

      const userLikedPost = data.likes.find((item) => item.userId === sub)

      setIsPostLiked(!!userLikedPost)
    }

    onLoad()
  }, [data.likes])

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
