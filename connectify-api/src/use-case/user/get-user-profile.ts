import { FollowRepository } from "@/repositories/follow";
import { PostsRepository } from "@/repositories/post";
import { UsersRepository } from "@/repositories/user";

type GetUserUseCaseRequest = {
  userId: string;
};

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
    private followsRepository: FollowRepository
  ) { }

  async execute({ userId }: GetUserUseCaseRequest) {
    const user = await this.usersRepository.findById(userId);
    const posts = await this.postsRepository.findPostForUser(userId)

    const followers = await this.followsRepository.findManyFollowers(userId)
    const following = await this.followsRepository.findManyFollowing(userId)

    if (!user) {
      throw new Error("User not exists with this id.");
    }

    return {
      user: {
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        details: user.details
      },
      follows: {
        followers,
        following
      },
      posts
    };
  }
}
