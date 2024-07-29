import type { Metadata } from 'next'

import { searchPosts } from '@/http/search-posts'
import { Grid } from '@/components/pages/search/posts/grid'

export const metadata: Metadata = {
  title: 'Postagens | connectify',
}

type PostsProps = {
  searchParams: {
    q?: string
    page?: number
  }
}

export default async function Posts({ searchParams: { q, page } }: PostsProps) {
  const posts = await searchPosts({
    query: q ?? '',
    page,
  })

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <Grid posts={posts.posts} meta={posts.meta} />
    </section>
  )
}
