import Link from 'next/link'

import { Post } from '@/types/post'
import { Button } from '@/components/ui/button'
import { CardPost } from '@/components/shared/post/card-post'

type PostsList = {
  posts: Post[]
  query?: string
}

export function PostsList({ posts, query }: PostsList) {
  return (
    <>
      {posts.length < 5 && (
        <div className="space-y-3">
          {posts.map((item, i) => (
            <CardPost data={item} key={i} />
          ))}
        </div>
      )}

      {posts.length > 5 && (
        <div className="space-y-3">
          {posts.map((item, i) => {
            if (i >= 5) {
              return null
            }

            return <CardPost data={item} key={i} />
          })}

          <div className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
            <Button asChild variant="outline">
              <Link
                href={`${query ? `/posts?search=${query}` : '/posts'}`}
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
