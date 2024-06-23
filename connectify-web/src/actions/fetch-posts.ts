import { api } from '@/lib/axios'
import { Post } from '@/types/post'

export async function fetchPosts(page: number, token: string) {
  try {
    const feedPosts = await api.get(`/posts/fetch?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token.replace(/["]/g, '')}`,
      },
    })

    return feedPosts.data.posts as Post[]
  } catch (error) {
    console.error(error)
  }
}
