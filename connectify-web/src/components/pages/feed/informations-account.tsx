'use client'

import { useCallback, useEffect, useState } from 'react'

import { User } from '@/types/user'
import { Post } from '@/types/post'

import { api } from '@/lib/axios'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export function InformationsAccount() {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])

  const fetchData = useCallback(async () => {
    const feedPosts = await api.get('/me')

    setUser(feedPosts.data.user)
    setPosts(feedPosts.data.posts)
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
        <p className="text-sm">Qnt. de seguidores</p>
        <span className="text-blue-500 dark:text-blue-400">{posts.length}</span>
      </div>

      <div className="flex justify-between w-full">
        <p className="text-sm">Qnt. de posts</p>
        <span className="text-blue-500 dark:text-blue-400">{posts.length}</span>
      </div>

      <div className="flex justify-between w-full">
        <p className="text-sm">Qnt. de curtidas</p>
        <span className="text-blue-500 dark:text-blue-400">{posts.length}</span>
      </div>
    </aside>
  )
}
