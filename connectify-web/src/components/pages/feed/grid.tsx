'use client'

import { api } from '@/lib/axios'
import { CardPost } from '../../shared/card-post'
import { useCallback, useEffect, useState } from 'react'
import { Post } from '@/types/post'

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
    <div className="flex flex-col gap-5 items-center py-5 px-20">
      {posts.map((item, i) => (
        <CardPost data={item} key={i} />
      ))}
      {posts.map((item, i) => (
        <CardPost data={item} key={i} />
      ))}
      {posts.map((item, i) => (
        <CardPost data={item} key={i} />
      ))}
    </div>
  )
}
