'use client'

import { api } from '@/lib/axios'
import { CardPost } from '../../shared/post/card-post'
import { useCallback, useEffect, useState } from 'react'
import { Post } from '@/types/post'
import { CreatePostDialog } from '../../shared/post/create-post'

export function Grid() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchData = useCallback(async () => {
    const feedPosts = await api.get('/posts/fetch')

    console.log(feedPosts)
    setPosts(feedPosts.data.posts)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <section className="flex flex-col gap-5 items-center py-5 px-8 sm:px-20">
      <header className="flex justify-between items-center w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
        <p>Digite o que está pensando</p>
        <CreatePostDialog />
      </header>

      {posts.map((item, i) => (
        <CardPost data={item} key={i} />
      ))}
    </section>
  )
}
