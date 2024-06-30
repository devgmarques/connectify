import type { Metadata } from 'next'

import { Grid } from '@/components/pages/posts/grid'
import { searchPosts } from '@/actions/search-posts'

export const metadata: Metadata = {
  title: 'Postagens | connectify',
}

type PostsProps = {
  searchParams: {
    search: string
    page?: number
  }
}

export default async function Posts({
  searchParams: { search, page },
}: PostsProps) {
  const posts = await searchPosts({
    query: search,
    page,
  })

  if (!posts) {
    return <p>loading...</p>
  }

  return (
    <section className="flex m-auto max-w-[750px] flex-col gap-5 items-center py-5 px-5 sm:px-10">
      <Grid posts={posts.posts} meta={posts.meta} />
    </section>
  )
}
