import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { searchUsers } from '@/actions/search-users'
import { Grid } from '@/components/pages/users/grid'

export const metadata: Metadata = {
  title: 'Usuários | connectify',
}

type UsersProps = {
  searchParams: {
    search: string
    page?: number
  }
}

export default async function Users({
  searchParams: { search, page },
}: UsersProps) {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  const users = await searchUsers({
    query: search,
    page,
    token,
  })

  if (!users) {
    return <p>loading...</p>
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <Grid users={users.users} meta={users.meta} />
    </section>
  )
}
