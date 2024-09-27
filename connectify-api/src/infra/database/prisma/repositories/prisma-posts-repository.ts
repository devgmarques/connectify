import { PostsRepository } from "@/application/protocols/database"
import { prisma } from ".."
import { Post } from "@/domain/entities"

export class PrismaPostsRepository implements PostsRepository {
  async create(input: PostsRepository.Create.Input): PostsRepository.Create.Output {
    const post = await prisma.post.create({
      data: {
        author: input.author,
        body: input.body,
        title: input.title,
        userId: input.userId
      }
    })

    const correctPostFormat: Post = {
      postId: post.id,
      title: post.title,
      body: post.body,
      author: post.author,
      userId: post.userId,
      createdAt: post.createdAt
    } 

    return correctPostFormat
  }
  
  async update(input: PostsRepository.Update.Input): PostsRepository.Update.Output {
    const post = await prisma.post.update({
      where: {
        id: input.postId,
        userId: input.userId
      },
      data: {
        author: input.author,
        body: input.body,
        title: input.title,
        userId: input.userId
      }
    })

    const correctPostFormat: Post = {
      postId: post.id,
      title: post.title,
      body: post.body,
      author: post.author,
      userId: post.userId,
      createdAt: post.createdAt
    } 

    return correctPostFormat
  }

  async findMany(input: PostsRepository.FindMany.Input): PostsRepository.FindMany.Output {
    const posts = await prisma.post.findMany({
      take: 10,
      skip: (input.page - 1) * 10,
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
        user: {
          select: {
            url_avatar: true,
            name: true,
            nickname: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                nickname: true,
                url_avatar: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    })

    return posts as any
  }  

  async findById(input: PostsRepository.FindById.Input): PostsRepository.FindById.Output {
    const post = await prisma.post.findFirst({ where: { id: input.postId } })

    if (!post) {
      return null
    }

    const correctPostFormat: Post = {
      postId: post.id,
      title: post.title,
      body: post.body,
      author: post.author,
      userId: post.userId,
      createdAt: post.createdAt
    } 

    return correctPostFormat
  }

  async findByTitle(input: PostsRepository.FindByTitle.Input): PostsRepository.FindByTitle.Output {
    const post = await prisma.post.findFirst({ 
      where: { userId: input.userId, title: input.title } 
    })

    if (!post) {
      return null
    }

    const correctPostFormat: Post = {
      postId: post.id,
      title: post.title,
      body: post.body,
      author: post.author,
      userId: post.userId,
      createdAt: post.createdAt
    } 

    return correctPostFormat
  }

  async findPostForUser(input: PostsRepository.FindPostForUser.Input): PostsRepository.FindPostForUser.Output {
    const posts = await prisma.post.findMany({
      where: {
        userId: input.userId
      },
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
        user: {
          select: {
            url_avatar: true,
            name: true,
            nickname: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                nickname: true,
                url_avatar: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    })

    return posts as any
  }

  async searchMany(input: PostsRepository.SearchMany.Input): PostsRepository.SearchMany.Output {
    const posts = await prisma.post.findMany({
      where: { title: { contains: input.query } },
      take: 10,
      skip: (input.page - 1) * 10,
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
        user: {
          select: {
            url_avatar: true,
            name: true,
            nickname: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                nickname: true,
                url_avatar: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    })

    return posts as any
  }

  async countAllPosts(input: PostsRepository.CountAllPosts.Input): PostsRepository.CountAllPosts.Output {
    const posts = await prisma.post.count({
      where: { title: { contains: input.query } },
    })

    return posts
  }

  async delete(input: PostsRepository.Delete.Input): PostsRepository.Delete.Output {
    await prisma.post.delete({
      where: {
        id: input.postId
      }
    })
  }
}