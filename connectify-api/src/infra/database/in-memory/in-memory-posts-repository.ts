import { PostsRepository } from "@/application/protocols/database"
import { Post } from "@/domain/entities"

export class InMemoryPostsRepository implements PostsRepository {
    private database: Post[] = []

    async create(input: PostsRepository.Create.Input): PostsRepository.Create.Output {
      const post: Post = {
        postId: input.postId ?? 0,
        author: input.author,
        body: input.body,
        title: input.title,
        userId: input.userId,
        createdAt: new Date(),
      }

      this.database.push(post)

      return post
    }

    async update(input: PostsRepository.Update.Input): PostsRepository.Update.Output {
      const postIndex = this.database.findIndex(item => item.postId === input.postId)

      const post = this.database[postIndex]

      const updatedPost: Post = {
        userId: post.userId,
        postId: input.postId,
        author: input.author,
        body: input.body ?? post.body,
        title: input.title ?? post.title,
        createdAt: new Date(),
      }

      this.database[postIndex] = updatedPost
      return updatedPost
    }

    async findMany(input: PostsRepository.FindMany.Input): PostsRepository.FindMany.Output {
      const posts = this.database.slice((input.page - 1) * 20, input.page * 20)

      return posts  
    }

    async findById(input: PostsRepository.FindById.Input): PostsRepository.FindById.Output {
      const post = this.database.find((item) => item.postId === input.postId)

      if (!post) {
        return null
      }

      return post
    }

    async findByTitle(input: PostsRepository.FindByTitle.Input): PostsRepository.FindByTitle.Output {
      const post = this.database.find(
        (item) => item.userId === input.userId && item.title === input.title
      )
  
      if (!post) {
        return null
      }
  
      return post
    }

    async findPostForUser(input: PostsRepository.FindPostForUser.Input): PostsRepository.FindPostForUser.Output {
      const posts = this.database
      .filter((item) => item.userId === input.userId)

      return posts
    }

    async searchMany(input: PostsRepository.SearchMany.Input): PostsRepository.SearchMany.Output {
      const posts = this.database
        .filter((item) => item.title.toLowerCase().includes(input.query.toLowerCase()))
        .slice((input.page - 1) * 20, input.page * 20)

      return posts;
    }

    async countAllPosts(input: PostsRepository.CountAllPosts.Input): PostsRepository.CountAllPosts.Output {
      const count = this.database.reduce((acc, item) => {
        if (item.title.includes(input.query)) {
          return acc + 1
        }
  
        return acc
      }, 0)
  
      return count
    }

    async delete(input: PostsRepository.Delete.Input): PostsRepository.Delete.Output {
      const posts = this.database.filter(item => item.postId !== input.postId)

      this.database = posts
    }
}