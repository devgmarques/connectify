'use client'

import { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'

import { getTokenData } from '@/utils/get-token-data'
import { User } from '@/types/user'
import { Follow } from '@/types/follow'
import { getProfile } from '@/http/get-profile'
import { Button } from '@/components/ui/button'

import { CardUser } from '../../shared/users/card-user'

type UsersListProps = {
  users: User[]
  query?: string
}

export function UsersList({ users, query }: UsersListProps) {
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
