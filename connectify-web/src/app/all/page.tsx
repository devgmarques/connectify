import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'

import { searchPosts } from '@/actions/search-posts'
import { searchUsers } from '@/actions/search-users'
import { Grid } from '@/components/pages/all/grid'
import searchEngines from '@/public/images/search-engines.svg'

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
    searchUsers({ query: search, token }),
    searchPosts({ query: search, token }),
  ])

  if (!posts || !users) {
    return (
      <section className="flex m-auto max-w-[750px] flex-col items-center py-5 px-5 sm:px-10">
        <div className="w-full overflow-hidden px-7 py-5 flex flex-col bg-background rounded-md border border-foreground/20">
          <Image
            src={searchEngines}
            alt="Pesquisar novamente"
            className="max-w-full sm:max-w-96 m-auto"
          />

          <h2 className="mt-5 text-center text-foreground text-medium mb-2 text-xl">
            Nenhum resultado foi encontrado
          </h2>

          <p className="text-base text-center text-foreground/70">
            Tente diminuir ou reescrever seus termos de pesquisa.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col items-center py-5 px-5 sm:px-10">
      <Grid posts={posts.posts} users={users.users} query={search} />
    </section>
  )
}
