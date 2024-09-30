import { Like } from './like'
import { Comment } from './comment'

export type Post = {
  id: number
  author: string
  title: string
  body: string
  createdAt: string
  userId: string
  user: {
    url_avatar: string | null
    name: string
    nickname: string
  }
  comments: Comment[]
  likes: Like[]
  _count: {
    likes: number
    comments: number
  }
}
