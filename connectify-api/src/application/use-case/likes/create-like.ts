import { PostNotExistError } from "../../errors"

import { PostsRepository, LikesRepository } from "@/application/protocols/database"
import { ICreateLikeUseCase } from "@/domain/use-cases/likes"

export class CreateLikeUseCase implements ICreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository
  ) { }

  async execute(input: ICreateLikeUseCase.Input): ICreateLikeUseCase.Output {
      const post = await this.postsRepository.findById({ postId: input.postId })
  
      if (!post) {
        throw new PostNotExistError()
      }
  
      const checkIfTheUserHasAlreadyLikedThePost =
        await this.likesRepository.findByUserIdAndPostId({ postId: input.postId, userId: input.userId })
  
      if (checkIfTheUserHasAlreadyLikedThePost) {
        await this.likesRepository.delete({
          likeId: checkIfTheUserHasAlreadyLikedThePost.likeId
        })
  
        return false
      }
  
      await this.likesRepository.create({
        postId: input.postId,
        userId: input.userId,
      })
  
      return true
  }
}