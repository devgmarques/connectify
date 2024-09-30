import { CardPost } from '@/components/shared/post/card'
import { Post } from '@/@types'

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
