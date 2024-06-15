import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { searchPosts } from '@/actions/search-posts'
import { Grid } from '@/components/pages/all/grid'
import { searchUsers } from '@/actions/search-users'

export const metadata: Metadata = {
  title: 'Pesquisar | connectify',
}

type AllProps = {
  searchParams: { search: string }
}

export default async function All({ searchParams: { search } }: AllProps) {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  const [users, posts] = await Promise.all([
    await searchUsers({ query: search, token }),
    await searchPosts({ query: search, token }),
  ])

  if (!posts || !users) {
    return <p>loading...</p>
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col items-center py-5 px-5 sm:px-10">
      <Grid posts={posts.posts} users={users.users} query={search} />
    </section>
  )
}
