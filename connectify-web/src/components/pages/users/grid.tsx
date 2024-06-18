'use client'

import { User } from '@/types/user'
import { Pagination } from '@/components/shared/pagination'
import { CardUser } from '@/components/shared/users/card-user'
import { useCallback, useEffect, useState } from 'react'
import { Follow } from '@/types/follow'
import { getTokenData } from '@/utils/get-token-data'
import { api } from '@/lib/axios'

type GridProps = {
  users: User[]
  meta: {
    countUsers: number
  }
}

export function Grid({ meta, users }: GridProps) {
  const [follows, setFollows] = useState<Follow>()

  const fetchData = useCallback(async () => {
    const { payload } = getTokenData()
    const meResponse = await api.get(`/users/${payload.nickname}/profile`)

    setFollows(meResponse.data.follows)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!follows) {
    return null
  }

  return (
    <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
      <h2 className="font-base text-foreground/70 pb-4">
        Cerca de {meta.countUsers} usuários
      </h2>

      {users.map((item) => (
        <CardUser follows={follows} data={item} key={item.id} />
      ))}

      {meta.countUsers > 10 && <Pagination countAllItems={meta.countUsers} />}
    </section>
  )
}
