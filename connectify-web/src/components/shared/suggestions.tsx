'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { User } from '@/types/user'
import { Follow } from '@/types/follow'
import { fetchUsers } from '@/http/fetch-users'
import { Separator } from '@/components/ui/separator'

import { ButtonFollow } from './follow/button-follow'

import { Skeleton } from '../ui/skeleton'

type SuggestionsProps = {
  follows: Follow
}

export function Suggestions({ follows }: SuggestionsProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      const usersResponse = await fetchUsers()

      setUsers(usersResponse.users)
    }

    fetchData()
  }, [])

  if (!users || !follows) {
    return (
      <div className="rounded-md space-y-[4px] w-64 my-5 p-5 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
        <Skeleton className="h-6 w-52" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    )
  }

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
