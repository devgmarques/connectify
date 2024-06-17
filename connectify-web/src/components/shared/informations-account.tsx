'use client'

import { useCallback, useEffect, useState } from 'react'

import { User } from '@/types/user'
import { Post } from '@/types/post'

import { api } from '@/lib/axios'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Follow } from '@/types/follow'
import { getTokenData } from '@/utils/get-token-data'

export function InformationsAccount() {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])
  const [follows, setFollows] = useState<Follow>()

  const fetchData = useCallback(async () => {
    const { payload } = getTokenData()

    const feedPosts = await api.get(`/users/${payload.nickname}/profile`)

    setUser(feedPosts.data.user)
    setPosts(feedPosts.data.posts)
    setFollows(feedPosts.data.follows)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <aside className="rounded-md w-64 my-5 p-4 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
      <Avatar className="z-0">
        <AvatarFallback>
          {user?.name.split(' ').map((item) => item[0])}
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
