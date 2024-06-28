import { FollowsRepository } from "@/entities/follow";
import { PostsRepository } from "@/repositories/post";
import { UsersRepository } from "@/entities/user";
import { UserNotExistError } from "../errors/user-not-exist-error";

type GetUserUseCaseRequest = {
  nickname: string;
};

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private followsRepository: FollowsRepository
  ) { }

  async execute({ nickname }: GetUserUseCaseRequest) {
    const user = await this.usersRepository.findByNickName(nickname);

    if (!user) {
      throw new UserNotExistError();
    }

    const posts = await this.postsRepository.findPostForUser(user.id)
    const following = await this.followsRepository.findManyFollowing(user.id)

    const followersAmount = await this.followsRepository.countManyFollowersAmount(user.id)
    const followingAmount = await this.followsRepository.countManyFollowingAmount(user.id)

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
    };
  }
}
