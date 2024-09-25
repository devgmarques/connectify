import { beforeEach, describe, expect, it, vitest } from "vitest"
import { GetProfileUserUseCase } from "./get-profile-user"
import { IGetProfileUserUseCase } from "@/domain/use-cases/users"
import { FollowsRepository, PostsRepository, UsersRepository } from "@/application/protocols/database"
import { InMemoryFollowsRepository, InMemoryPostsRepository, InMemoryUsersRepository } from "@/infra/database/in-memory"
import { UserNotExistError } from "@/application/errors"

let followsRepository: FollowsRepository
let usersRepository: UsersRepository
let postsRepository: PostsRepository
let sup: IGetProfileUserUseCase

describe("get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    postsRepository = new InMemoryPostsRepository()
    followsRepository = new InMemoryFollowsRepository()
    sup = new GetProfileUserUseCase(usersRepository, postsRepository, followsRepository)

    usersRepository.create({
      userId: "userId-01",
      email: "email",
      name: "name",
      password: "password",
      nickname: "nickname",
    })

    postsRepository.create({
      postId: 0,
      userId: "userId-01",
      author: "author",
      body: "body",
      title: "title",
    })
  })

  it("should be able to get profile user", async () => {
    const { posts, user } = await sup.execute({
      nickname: "nickname" 
    })

    expect(user.email).toBe("email")
    expect(user.name).toBe("name")
    expect(user.nickname).toBe("nickname")
    expect(user.url_avatar).toBe("url_avatar")
    expect(user.details).toBe("details")

    expect(posts).toHaveLength(1)
  })

  it("should not be able to get user", () => {
    vitest.spyOn(usersRepository, 'findByNickName').mockImplementationOnce(async () => null)

    expect(
      () => sup.execute({ nickname: "userId-01" })
    ).rejects.toBeInstanceOf(UserNotExistError)
  })
})
