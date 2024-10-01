import type { Metadata } from 'next'

import { fetchPosts } from '@/http'
import { Skeleton } from '@/components/ui'
import { DialogCreatePost } from '@/components/shared/post'
import { LoadMore } from '@/components/shared'
import { Grid } from '@/components/pages/feed'

export const metadata: Metadata = {
  title: 'Feed | connectify',
}

export default async function Feed() {
  const posts = await fetchPosts({ page: 1 })

  if (posts.length === 0) {
    return (
      <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
        <header className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
          <Skeleton className="w-full h-10" />
        </header>
        <div className="space-y-3 pt-4 w-full">
          <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
            <Skeleton className="w-full h-40" />
          </article>

          <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
            <Skeleton className="w-full h-40" />
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <header className="flex justify-between items-center w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
        <p>Digite o que está pensando</p>
        <DialogCreatePost />
      </header>

      <Grid posts={posts} />
      <LoadMore />
    </section>
  )
}
