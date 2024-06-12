import { CardPost } from '../../shared/post/card-post'
import { Post } from '@/types/post'

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
