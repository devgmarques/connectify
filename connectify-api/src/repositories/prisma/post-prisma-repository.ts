import { Prisma } from "@prisma/client";
import { PostsRepository } from "../post";
import { prisma } from "@/lib/prisma";

export class PostPrismaRepository implements PostsRepository {
  async create({
    author, body, title, userId
  }: Prisma.PostCreateManyInput) {
    const post = await prisma.post.create({
      data: {
        author,
        body,
        title,
        userId
      },
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
    });

    return post;
  }

  async countAllPosts(query: string) {
    const posts = await prisma.post.count({
      where: { title: { contains: query } },
    })

    return posts
  }

  async delete(postId: number) {
    await prisma.post.delete({
      where: {
        id: postId
      }
    })
  }

  async update({ author, body, title, userId, createdAt, id }: Prisma.PostCreateManyInput) {
    const post = await prisma.post.update({
      where: {
        userId,
        id
      },
      data: {
        id,
        author,
        body,
        title,
        userId,
        createdAt,
      },
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

    return post
  }

  async findById(id: number) {
    const post = await prisma.post.findFirst({ where: { id } });

    return post;
  }

  async findByTitle(userId: string, title: string) {
    const post = await prisma.post.findFirst({
      where: {
        userId,
        title,
      },
    });

    return post;
  }

  async findMany(page: number) {
    const posts = await prisma.post.findMany({
      take: 10,
      skip: (page - 1) * 10,
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

    return posts
  }

  async searchMany(page: number, query: string) {
    const posts = await prisma.post.findMany({
      where: { title: { contains: query } },
      take: 10,
      skip: (page - 1) * 10,
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
    });

    return posts;
  }

  async findPostForUser(userId: string) {
    const posts = await prisma.post.findMany({
      where: {
        userId
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

    return posts
  }
}
