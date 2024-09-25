import { PostsRepository } from "@/application/protocols/database"
import { IFetchPostUseCase } from "@/domain/use-cases/posts"

export class FetchPostUseCase implements IFetchPostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute(input: IFetchPostUseCase.Input): IFetchPostUseCase.Output {
    const posts = await this.postsRepository.findMany({ page: input.page })

    return posts
  }
}
