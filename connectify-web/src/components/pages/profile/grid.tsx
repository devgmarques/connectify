'use client'

import { CardPost } from '@/components/shared/post/card-post'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { Post } from '@/types/post'
import { User } from '@/types/user'
import { useCallback, useEffect, useState } from 'react'
import { CreatePostDialog } from '../../shared/post/create-post'
import { Follow } from '@/types/follow'
import { EditProfile } from './edit-profile'
import { getTokenData } from '@/utils/get-token-data'

type GridProps = {
  nickname: string
  token: string
}

export function Grid({ nickname }: GridProps) {
  const [user, setUser] = useState<User>()
  const [follow, setFollow] = useState<Follow>()
  const [posts, setPosts] = useState<Post[]>([])
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    const feedPosts = await api.get(`/users/${nickname}/profile`)

    const { payload } = getTokenData()

    setIsMyProfile(feedPosts.data.user.nickname === payload.nickname)

    setUser(feedPosts.data.user)
    setPosts(feedPosts.data.posts)
    setFollow(feedPosts.data.follows)
  }, [nickname])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!user) {
    return <p>Loading ...</p>
  }

  return (
    <section>
      <header className="rounded-md m-5 p-4 bg-background flex flex-col gap-8 justify-center items-center border border-foreground/20">
        <div className="w-full flex flex-col gap-5 items-center justify-between md:flex-row">
          <div className="flex gap-5 items-center">
            <Avatar className="z-0 w-20 h-20">
              <AvatarFallback>
                {user?.name.split(' ').map((item) => item[0])}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <div className="flex items-center gap-5">
                <h2 className="text-md text-center font-bold">
                  {user?.name}
                  {' / '}
                  <span className="text-foreground/60 text-sm text-center">
                    @{user?.nickname}
                  </span>
                </h2>

                {isMyProfile && (
                  <EditProfile
                    data={{
                      email: user.email,
                      details: user!.details ?? '',
                      name: user!.name,
                      nickname: user!.nickname,
                      password: '',
                    }}
                  />
                )}
              </div>

              <p className="text-foreground/60 text-sm mt-1">
                {user.details ?? 'Adicione sua descrição'}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {posts.length}
              </span>
              <p className="text-sm">Postagens</p>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {follow?.followers ?? 0}
              </span>
              <p className="text-sm">Seguidores</p>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {follow?.following ?? 0}
              </span>
              <p className="text-sm">Seguindo</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="w-full flex justify-between gap-5">
          <h2>Minhas postagens</h2>

          {isMyProfile && <CreatePostDialog />}
        </div>
      </header>

      <section className="m-5 grid grid-cols-1 gap-5 lg:grid-cols-2 ">
        {isMyProfile &&
          posts.map((item) => <CardPost isMe data={item} key={item.id} />)}

        {!isMyProfile &&
          posts.map((item) => <CardPost data={item} key={item.id} />)}
      </section>
    </section>
  )
}
