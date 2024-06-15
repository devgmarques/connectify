import { User } from '@/types/user'
import { Pagination } from '@/components/shared/pagination'
import { CardUser } from '@/components/shared/users/card-user'

type GridProps = {
  users: User[]
  meta: {
    countUsers: number
  }
}

export function Grid({ meta, users }: GridProps) {
  return (
    <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
      <h2 className="font-base text-foreground/70 pb-4">
        Cerca de {meta.countUsers} usuários
      </h2>

      {users.map((item) => (
        <CardUser data={item} key={item.id} />
      ))}

      {meta.countUsers > 10 && <Pagination countAllItems={meta.countUsers} />}
    </section>
  )
}
