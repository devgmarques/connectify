'use client'

import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { User } from '@/types/user'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ButtonFollow } from '../follow/button-follow'
import { Follow } from '@/types/follow'
import { getTokenData } from '@/utils/get-token-data'

export function ListUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [follows, setFollows] = useState<Follow>()

  const fetchData = useCallback(async () => {
    const { payload } = getTokenData()

    const [usersResponse, meResponse] = await Promise.all([
      api.get('/users/fetch'),
      api.get(`/users/${payload.nickname}/profile`),
    ])

    setFollows(meResponse.data.follows)
    setUsers(usersResponse.data.users)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <aside className="rounded-md space-y-[2px] w-64 my-5 p-5 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
      <h2 className="text-md font-bold">Sugestões para você</h2>
      <Separator />

      {users.map((item) => {
        const alreadyFollowing = follows?.following.find(
          (following) => following.followedId === item.id,
        )

        if (alreadyFollowing) {
          return (
            <div
              className="flex items-center justify-between w-full"
              key={item.nickname}
            >
              <Link href={`/${item.nickname}`} className="text-sm">
                {item.nickname}
              </Link>
              <ButtonFollow isFollowing={true} data={item} />
            </div>
          )
        }

        return (
          <div
            className="flex items-center justify-between w-full"
            key={item.nickname}
          >
            <Link href={`/${item.nickname}`} className="text-sm">
              {item.nickname}
            </Link>
            <ButtonFollow data={item} />
          </div>
        )
      })}
    </aside>
  )
}
