'use client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { fetchPosts } from '@/actions/fetch-posts'
import { Post } from '@/types/post'
import { Grid } from '@/components/pages/feed/grid'
import { Spinner } from './spinner'

export function LoadMore() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const { ref, inView } = useInView()

  const loadMoreCustomer = useCallback(async () => {
    const nextPage = page + 1

    const newProducts = (await fetchPosts(nextPage)) ?? []

    if (newProducts.length < 1) {
      setLoading(false)
    }
    setPosts((prevProducts: Post[]) => [...prevProducts, ...newProducts])
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
