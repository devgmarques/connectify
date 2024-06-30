import { api } from '@/lib/axios'
import { Post } from '@/types/post'

export async function fetchPosts(page: number) {
  try {
    const feedPosts = await api.get(`/posts/fetch?page=${page}`)

    return feedPosts.data.posts as Post[]
  } catch (error) {}
}
