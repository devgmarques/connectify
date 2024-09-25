import { FollowsRepository } from "@/application/protocols/database"

import { ICreateFollowUseCase } from "@/domain/use-cases/follows"

export class CreateFollowUseCase implements ICreateFollowUseCase {
  constructor(private followsRepository: FollowsRepository) { }

  async execute(input: ICreateFollowUseCase.Input): ICreateFollowUseCase.Output {
    const findFollowById = await this.followsRepository.findByFollowedIdAndUserId({
      userId: input.userId,
      followedId: input.followedId,
    })
      
    if (findFollowById) {
      await this.followsRepository.delete({
        followedId: input.followedId,
        userId: input.userId,
      })

      return false
    }

    await this.followsRepository.create({ followedId: input.followedId, userId: input.userId })

    return true
  }
}