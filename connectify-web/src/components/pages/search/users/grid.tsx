'use client'

import { useCallback, useEffect, useState } from 'react'

import { getTokenData } from '@/utils/get-token-data'
import { User } from '@/types/user'
import { Follow } from '@/types/follow'
import { getProfile } from '@/http/get-profile'
import { Skeleton } from '@/components/ui/skeleton'
import { CardUser } from '@/components/shared/users/card-user'
import { Pagination } from '@/components/shared/pagination'

type GridProps = {
  users: User[]
  meta: {
    countUsers: number
  }
}

export function Grid({ meta, users }: GridProps) {
  const [follows, setFollows] = useState<Follow>()

  const fetchData = useCallback(async () => {
    const { nickname } = await getTokenData()
    const { follows } = await getProfile({
      nickname,
    })

    setFollows(follows)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!follows) {
    return (
      <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
        <Skeleton className="h-4 w-20" />

        <div className="space-y-3 pt-4">
          <div className="py-3 flex justify-between items-center border-t border-foreground/20">
            <Skeleton className="w-32 h-10 sm:w-52" />
            <Skeleton className="w-16 h-10 sm:w-28" />
          </div>

          <div className="py-3 flex justify-between items-center border-t border-foreground/20">
            <Skeleton className="w-32 h-10 sm:w-52" />
            <Skeleton className="w-16 h-10 sm:w-28" />
          </div>

          <div className="py-3 flex justify-between items-center border-t border-foreground/20">
            <Skeleton className="w-32 h-10 sm:w-52" />
            <Skeleton className="w-16 h-10 sm:w-28" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
      <h2 className="font-base text-foreground/70 pb-4">
        Cerca de {meta.countUsers} usuários
      </h2>

      <div className="flex flex-col gap-6">
        {users.map((item) => (
          <CardUser
            widthAvatar="lg"
            follows={follows}
            data={item}
            key={item.id}
          />
        ))}
      </div>

      {meta.countUsers > 10 && <Pagination countAllItems={meta.countUsers} />}
    </section>
  )
}
