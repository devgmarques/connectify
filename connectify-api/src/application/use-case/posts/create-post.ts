import { PostsRepository } from "@/application/protocols/database"
import { TitleAlreadyExistInUserError } from "@/application/errors"

import { ICreatePostUseCase } from "@/domain/use-cases/posts"


export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute(input: ICreatePostUseCase.Input): ICreatePostUseCase.Output {
    const postWithThisTitleAlreadyExistsInTheUser =
      await this.postsRepository.findByTitle({ title: input.data.title, userId: input.userId })

    if (postWithThisTitleAlreadyExistsInTheUser) {
      throw new TitleAlreadyExistInUserError()
    }

    const post = await this.postsRepository.create({
      body: input.data.body,
      title: input.data.title,
      author: input.data.author,
      userId: input.userId,
    })

    return post
  }
}