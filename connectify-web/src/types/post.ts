import { Like } from './like'

export type Post = {
  id: number
  author: string
  title: string
  body: string
  createdAt: string
  userId: string
  likes: Like[]
  _count: {
    likes: number
  }
}
