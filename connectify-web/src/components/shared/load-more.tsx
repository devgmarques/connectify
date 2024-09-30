'use client'

import { useCallback, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { fetchPosts } from '@/http'
import { Grid } from '@/components/pages/feed'
import { Post } from '@/@types'

import { Spinner } from './spinner'

export function LoadMore() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const { ref, inView } = useInView()

  const loadMoreCustomer = useCallback(async () => {
    const nextPage = page + 1

    const { posts: newPosts } = (await fetchPosts({ page: nextPage })) ?? []

    if (newPosts.length < 1) {
      setLoading(false)
    }

    setPosts((prevProducts) => [...prevProducts, ...newPosts])
    setPage(nextPage)
  }, [page])

  useEffect(() => {
    if (inView) {
      loadMoreCustomer()
    }
  }, [inView, loadMoreCustomer])

  return (
    <>
      <Grid posts={posts} />

      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {loading && <Spinner />}
      </div>
    </>
  )
}
