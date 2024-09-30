'use client'

import { useEffect, useState } from 'react'

import { fetchUsers } from '@/http'
import { Separator, Skeleton } from '@/components/ui'
import { Follow, User } from '@/@types'

import { CardUser } from './users'

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

  if (users.length === 0) {
    return (
      <div className="rounded-md space-y-[4px] w-64 my-5 p-5 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
        <Skeleton className="h-6 w-52" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-52" />
        </div>
      </div>
    )
  }

  return (
    <aside className="rounded-md space-y-[2px] w-64 my-5 p-5 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
      <h2 className="text-md font-bold">Sugestões para você</h2>
      <Separator />

      {users.map((item) => (
        <CardUser data={item} follows={follows} widthAvatar="sm" />
      ))}
    </aside>
  )
}
