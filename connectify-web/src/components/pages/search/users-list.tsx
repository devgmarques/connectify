'use client'

import { User } from '@/types/user'
import { CardUser } from '../../shared/users/card-user'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { getTokenData } from '@/utils/get-token-data'
import { api } from '@/lib/axios'
import { Follow } from '@/types/follow'

type UsersListProps = {
  users: User[]
  query?: string
}

export function UsersList({ users, query }: UsersListProps) {
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
    <>
      {users.length < 5 &&
        users.map((item) => (
          <CardUser follows={follows} data={item} key={item.id} />
        ))}

      {users.length > 5 && (
        <div>
          {users.slice(0, 5).map((item) => (
            <CardUser follows={follows} data={item} key={item.id} />
          ))}

          <Button asChild variant="outline">
            <Link
              href={`${query ? `/users?search=${query}` : '/users'}`}
              className="w-full m-auto py-3 text-center text-foreground text-medium mb-2 text-base"
            >
              Ver mais
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
