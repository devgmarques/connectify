import { FollowRepository } from "@/repositories/follow";

type CreateFollowUserUseCaseRequest = {
  userId: string;
  followedId: string;
};

export class CreateFollowUserUseCase {
  constructor(private followsRepository: FollowRepository) {}

  async execute({ followedId, userId }: CreateFollowUserUseCaseRequest) {
    const findFollowById = await this.followsRepository.findById({
      userId,
      followedId,
    });

    if (findFollowById) {
      await this.followsRepository.removeFollow({
        followedId,
        userId,
      });

      return {
        type: "remove_follow",
      };
    }

    await this.followsRepository.create({ followedId, userId });

    return {
      type: "created",
    };
  }
}
