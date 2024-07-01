import { Post } from '@/types/post'

import { CardPost } from '../../shared/post/card-post'

type GridProps = {
  posts: Post[]
}

export function Grid({ posts }: GridProps) {
  return (
    <>
      {posts.map((item, i) => (
        <CardPost data={item} key={i} />
      ))}
    </>
  )
}
