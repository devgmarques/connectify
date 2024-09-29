'use client'

import { useEffect, useState } from 'react'

import { PiChatTextBold } from 'react-icons/pi'

import { getTokenData } from '@/utils'
import { Follow, Post, User } from '@/types'
import { Avatar, AvatarFallback, AvatarImage, Separator } from '@/components/ui'
import { CardPost } from '@/components/shared/post/card'
import { DialogCreatePost } from '@/components/shared/post'

import { DialogUpdateProfile } from './dialog-update-profile'
import { DialogUpdateAvatar } from './dialog-update-avatar'

type GridProps = {
  data: {
    user: User
    posts: Post[]
    follows: Follow
  }
}

export function Grid({ data: { follows, posts, user } }: GridProps) {
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)
  const [postsState, setPostsState] = useState<Post[]>(posts ?? [])

  useEffect(() => {
    async function onLoad() {
      const { nickname } = await getTokenData()

      setIsMyProfile(user.nickname === nickname)
    }

    onLoad()
  }, [user.nickname])

  return (
    <section>
      <header className="rounded-md m-5 p-4 bg-background flex flex-col gap-8 justify-center items-center border border-foreground/20">
        <div className="w-full flex flex-col gap-5 items-center justify-between md:flex-row">
          <div className="flex gap-5 items-center">
            {isMyProfile ? (
              <DialogUpdateAvatar data={user} />
            ) : (
              <Avatar className="z-0 w-20 h-20">
                <AvatarImage src={user.url_avatar} alt="Avatar" />
                <AvatarFallback>
                  {user.name.split(' ').map((item) => item[0].toUpperCase())}
                </AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-5">
                <h2 className="text-md text-center font-bold">
                  {user.name}
                  {' / '}
                  <span className="text-foreground/60 text-sm text-center">
                    @{user.nickname}
                  </span>
                </h2>

                {isMyProfile && (
                  <DialogUpdateProfile
                    data={{
                      email: user.email,
                      details: user.details ?? '',
                      name: user.name,
                      nickname: user.nickname,
                      password: '',
                    }}
                  />
                )}
              </div>

              <p className="text-foreground/60 text-sm mt-1">
                {user.details ?? 'Sem descrição'}
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {posts.length}
              </span>
              <p className="text-sm">Publicação</p>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {follows._count.followersAmount ?? 0}
              </span>
              <p className="text-sm">Seguidores</p>
            </div>

            <div className="flex flex-col gap-2 items-center">
              <span className="text-blue-500 dark:text-blue-400 text-xl">
                {follows._count.followingAmount ?? 0}
              </span>
              <p className="text-sm">Seguindo</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="w-full flex justify-between gap-5">
          <h2>Minhas publicações</h2>

          {isMyProfile && <DialogCreatePost setPostsState={setPostsState} />}
        </div>
      </header>

      {posts.length === 0 && (
        <article className="m-5 p-4 bg-background rounded-md border border-foreground/20">
          <p className="flex items-center gap-2 text-lg">
            <PiChatTextBold />
            Ainda não ha nenhuma publicação
          </p>
        </article>
      )}

      <section className="m-5 grid grid-cols-1 gap-5 lg:grid-cols-2 ">
        {isMyProfile &&
          postsState.map((item) => <CardPost isMe data={item} key={item.id} />)}

        {!isMyProfile &&
          postsState.map((item) => <CardPost data={item} key={item.id} />)}
      </section>
    </section>
  )
}
