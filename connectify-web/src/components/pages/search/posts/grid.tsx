import { Post } from '@/types/post'
import { CardPost } from '@/components/shared/post/card-post'
import { Pagination } from '@/components/shared/pagination'

type GridProps = {
  posts: Post[]
  meta: {
    countPosts: number
  }
}

export function Grid({ meta, posts }: GridProps) {
  return (
    <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
      <h2 className="font-base text-foreground/70 pb-4">
        Cerca de {meta.countPosts} publicações
      </h2>

      <div className="space-y-3 mb-3">
        {posts.map((item) => (
          <CardPost data={item} key={item.id} />
        ))}
      </div>

      {meta.countPosts > 10 && <Pagination countAllItems={meta.countPosts} />}
    </section>
  )
}
