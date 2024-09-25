import { UserNotExistError } from "@/application/errors"
import { FollowsRepository, PostsRepository, UsersRepository } from "@/application/protocols/database"
import { IGetProfileUserUseCase } from "@/domain/use-cases/users"


export class GetProfileUserUseCase implements IGetProfileUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private followsRepository: FollowsRepository
  ) { }

  async execute(input: IGetProfileUserUseCase.Input): IGetProfileUserUseCase.Output {
    const user = await this.usersRepository.findByNickName({ nickname: input.nickname })

    if (!user) {
      throw new UserNotExistError()
    }

    const posts = await this.postsRepository.findPostForUser({ userId: user.userId })
    const following = await this.followsRepository.findManyFollowing({ userId: user.userId })

    const followersAmount = await this.followsRepository.countManyFollowersAmount({ userId: user.userId })
    const followingAmount = await this.followsRepository.countManyFollowingAmount({ userId: user.userId })

    return {
      user: {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        details: user.details,
        url_avatar: user.url_avatar
      },
      follows: {
        following,
        _count: {
          followersAmount,
          followingAmount
        }
      },
      posts
    }
  }
}
