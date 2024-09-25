import { PostsRepository } from "@/application/protocols/database"
import { TitleAlreadyExistInUserError } from "@/application/errors"
import { IUpdatePostUseCase } from "@/domain/use-cases/posts"

export class UpdatePostUseCase implements IUpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute(input: IUpdatePostUseCase.Input): IUpdatePostUseCase.Output {
      const postWithThisTitleAlreadyExistsInTheUser =
        await this.postsRepository.findByTitle({
          title: input.data.title,
          userId: input.userId
        })

      if (postWithThisTitleAlreadyExistsInTheUser) {
        throw new TitleAlreadyExistInUserError()
      }

      const post = await this.postsRepository.update({
        postId: input.data.postId,
        author: input.data.author,
        body: input.data.body,
        createdAt: new Date(input.data.createdAt),
        title: input.data.title,
        userId: input.userId
      })

      return post
  }
}