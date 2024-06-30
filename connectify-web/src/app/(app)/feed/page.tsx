import type { Metadata } from 'next'

import { Grid } from '@/components/pages/feed/grid'
import { fetchPosts } from '@/actions/fetch-posts'
import { LoadMore } from '@/components/shared/load-more'
import { CreatePostDialog } from '@/components/shared/post/create-post'

export const metadata: Metadata = {
  title: 'Feed | connectify',
}

export default async function Feed() {
  const posts = await fetchPosts(1)

  if (!posts) {
    return <p>Aguarde</p>
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <header className="flex justify-between items-center w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
        <p>Digite o que está pensando</p>
        <CreatePostDialog />
      </header>

      <Grid posts={posts} />
      <LoadMore />
    </section>
  )
}
