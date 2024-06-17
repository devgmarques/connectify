import { FollowsRepository } from "@/repositories/follow";

type CreateFollowUserUseCaseRequest = {
  userId: string;
  followedId: string;
};

export class CreateFollowUserUseCase {
  constructor(private followsRepository: FollowsRepository) { }

  async execute({ followedId, userId }: CreateFollowUserUseCaseRequest) {
    const findFollowById = await this.followsRepository.findByFollowedIdAndUserId({
      userId,
      followedId,
    });

    if (findFollowById) {
      await this.followsRepository.removeFollow({
        followedId,
        userId,
      });

      return {
        follow: false
      };
    }

    await this.followsRepository.create({ followedId, userId });

    return {
      follow: true
    };
  }
}
