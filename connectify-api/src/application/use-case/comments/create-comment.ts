import { ICreateCommentUseCase } from "@/domain/use-cases/comments"

import { CommentRepository, PostsRepository } from "@/application/protocols/database"

import { PostNotExistError } from "@/application/errors"

export class CreateCommentUseCase implements ICreateCommentUseCase {
  constructor(
    private commentsRepository: CommentRepository,
    private postsRepository: PostsRepository
  ) { }
    

  async execute(input: ICreateCommentUseCase.Input): ICreateCommentUseCase.Output {
    const postExists = await this.postsRepository.findById({ postId: input.postId })

    if (!postExists) {
      throw new PostNotExistError()
    }

    const comment = await this.commentsRepository.create({
      body: input.body,
      postId: input.postId,
      userId: input.userId
    })

    return comment
  }
}