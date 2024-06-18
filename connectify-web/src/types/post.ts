import { Comment } from './comment'
import { Like } from './like'

export type Post = {
  id: number
  author: string
  title: string
  body: string
  createdAt: string
  userId: string
  comments: Comment[]
  likes: Like[]
  _count: {
    likes: number
    comments: number
  }
}
