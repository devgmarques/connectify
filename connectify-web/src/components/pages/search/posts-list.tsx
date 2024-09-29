import Link from 'next/link'

import { Post } from '@/types'
import { Button } from '@/components/ui'
import { CardPost } from '@/components/shared/post/card'

type PostsList = {
  posts: Post[]
  query?: string
}

export function PostsList({ posts, query }: PostsList) {
  return (
    <>
      {posts.length < 5 ? (
        <div className="space-y-3">
          {posts.map((item, i) => (
            <CardPost data={item} key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {posts.slice(0, 5).map((item, i) => (
            <CardPost data={item} key={i} />
          ))}

          <div className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
            <Button asChild variant="outline">
              <Link
                href={`${query ? `/search/posts?search=${query}` : '/search/posts'}`}
                className="w-full m-auto py-3 text-center text-foreground text-medium mb-2 text-base"
              >
                Ver mais
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
