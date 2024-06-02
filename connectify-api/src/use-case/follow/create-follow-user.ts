import { FollowRepository } from "@/repositories/follow";

type CreateFollowUserUseCaseRequest = {
  userId: string;
  followedId: string;
};

export class CreateFollowUserUseCase {
  constructor(private followsRepository: FollowRepository) { }

  async execute({ followedId, userId }: CreateFollowUserUseCaseRequest) {
    const findFollowById = await this.followsRepository.findByFollowedIdAndUserId({
      userId,
      followedId,
    });

    if (findFollowById) {
      const follow = await this.followsRepository.removeFollow({
        followedId,
        userId,
      });

      return {
        follow: false
      };
    }

    const follow = await this.followsRepository.create({ followedId, userId });

    return {
      follow: follow ? true : false
    };
  }
}
