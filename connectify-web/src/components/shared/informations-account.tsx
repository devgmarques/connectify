'use client'

import { useCallback, useEffect, useState } from 'react'

import { getTokenData } from '@/utils/get-token-data'
import { User } from '@/types/user'
import { Post } from '@/types/post'
import { Follow } from '@/types/follow'
import { getProfile } from '@/http/get-profile'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Skeleton } from '../ui/skeleton'

export function InformationsAccount() {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])
  const [follows, setFollows] = useState<Follow>()

  const fetchData = useCallback(async () => {
    const { nickname } = getTokenData()

    const { follows, posts, user } = await getProfile({ nickname })

    setUser(user)
    setPosts(posts)
    setFollows(follows)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!user) {
    return (
      <div className="my-5 p-4 w-64 h-64 bg-background flex flex-col gap-3 justify-between items-center border border-foreground/20">
        <Skeleton className="rounded-full w-20 h-20" />

        <Skeleton className="h-4 w-36" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    )
  }

  return (
    <aside className="rounded-md w-64 my-5 p-4 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
      <Avatar className="z-0 w-20 h-20">
        <AvatarImage src={user.url_avatar} alt="Avatar" />
        <AvatarFallback>
          {user.name.split(' ').map((item) => item[0].toLowerCase())}
        </AvatarFallback>
      </Avatar>

      <h2 className="text-md text-center font-bold">{user?.name}</h2>
      <p className="text-sm text-center">{user?.details}</p>

      <Separator />

      <div className="flex justify-between w-full">
        <p className="text-sm">Qnt. de posts</p>
        <span className="text-blue-500 dark:text-blue-400">{posts.length}</span>
      </div>

      <div className="flex justify-between w-full">
        <p className="text-sm">Qnt. de seguidores</p>
        <span className="text-blue-500 dark:text-blue-400">
          {follows?._count.followersAmount}
        </span>
      </div>
    </aside>
  )
}
