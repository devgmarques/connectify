export type Comment = {
  id: number
  body: string
  postId: number
  userId: string
  createdAt: Date
  user: {
    nickname: string
    url_avatar: string | null
    name: string
  }
}
