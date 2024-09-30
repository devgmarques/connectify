'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { getTokenData } from '@/utils'
import { getProfile } from '@/http'
import { Button } from '@/components/ui'
import { CardUser } from '@/components/shared/users'
import { Spinner } from '@/components/shared'
import { Follow, User } from '@/@types'

type UsersListProps = {
  users: User[]
  query?: string
}

export function UsersList({ users, query }: UsersListProps) {
  const [follows, setFollows] = useState<Follow>()

  useEffect(() => {
    async function fetchData() {
      const { nickname } = await getTokenData()
      const { follows } = await getProfile({
        nickname,
      })

      setFollows(follows)
    }

    fetchData()
  }, [])

  if (!follows) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col gap-6">
      {users.length < 5 ? (
        users.map((item) => (
          <CardUser
            widthAvatar="lg"
            follows={follows}
            data={item}
            key={item.id}
          />
        ))
      ) : (
        <>
          {users.slice(0, 5).map((item) => (
            <CardUser
              widthAvatar="lg"
              follows={follows}
              data={item}
              key={item.id}
            />
          ))}

          <Button asChild variant="outline">
            <Link
              href={`${query ? `/search/users?search=${query}` : '/search/users'}`}
              className="w-full m-auto py-3 text-center text-foreground text-medium mb-2 text-base"
            >
              Ver mais
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}
