'use client'

import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/axios'
import { User } from '@/types/user'
import { useCallback, useEffect, useState } from 'react'

export function Suggestions() {
  const [users, setUsers] = useState<User[]>([])

  const fetchData = useCallback(async () => {
    const feedPosts = await api.get('/users/fetch')

    console.log(feedPosts)
    setUsers(feedPosts.data.users)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <aside className="rounded-md w-64 my-5 p-4 bg-background flex flex-col gap-3 justify-center items-center border border-foreground/20">
      <h2 className="text-md font-bold">Sugestões para você</h2>

      <Separator />

      {users.map((item, i) => {
        if (i > 9) {
          return <></>
        }

        return (
          <div className="flex justify-between w-full" key={item.nickname}>
            <p className="text-sm">{item.nickname}</p>
            <button className="text-blue-500 dark:text-blue-400 text-md font-bold">
              Seguir
            </button>
          </div>
        )
      })}
    </aside>
  )
}
