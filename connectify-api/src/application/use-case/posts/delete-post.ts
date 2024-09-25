import { PostNotExistError } from "@/application/errors"
import { PostsRepository } from "@/application/protocols/database"
import { IDeletePostUseCase } from "@/domain/use-cases/posts"

export class DeletePostUseCase implements IDeletePostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute(input: IDeletePostUseCase.Input): IDeletePostUseCase.Output {
    const findPost = await this.postsRepository.findById({ postId: input.postId })

    if (!findPost) {
      throw new PostNotExistError()
    }

    await this.postsRepository.delete({ postId: input.postId })
  }
}