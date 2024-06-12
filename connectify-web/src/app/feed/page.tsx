import type { Metadata } from 'next'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { Grid } from '@/components/pages/feed/grid'
import { fetchPosts } from '@/actions/fetch-posts'
import { LoadMore } from '@/components/shared/load-more'
import { CreatePostDialog } from '@/components/shared/post/create-post'

export const metadata: Metadata = {
  title: 'Feed | connectify',
}

export default async function Feed() {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (!token) {
    redirect('/accounts/login')
  }

  const posts = await fetchPosts(1, token)

  if (!posts) {
    return <p>Aguarde</p>
  }

  return (
    <section className="flex flex-col gap-5 items-center py-5 px-8 sm:px-20">
      <header className="flex justify-between items-center w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
        <p>Digite o que está pensando</p>
        <CreatePostDialog />
      </header>

      <Grid posts={posts} />
      <LoadMore />
    </section>
  )
}
