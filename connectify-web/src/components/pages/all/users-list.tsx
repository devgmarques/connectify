import { User } from '@/types/user'
import { CardUser } from '../../shared/users/card-user'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type UsersListProps = {
  users: User[]
  query?: string
}

export function UsersList({ users, query }: UsersListProps) {
  return (
    <>
      {users.length < 5 &&
        users.map((item) => <CardUser data={item} key={item.id} />)}

      {users.length > 5 && (
        <div>
          {users.map((item, i) => {
            if (i >= 5) {
              return null
            }

            return <CardUser data={item} key={item.id} />
          })}

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
