import { PostsRepository } from "@/application/protocols/database"
import { ISearchPostUseCase } from "@/domain/use-cases/posts"

export class SearchPostUseCase implements ISearchPostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute(input: ISearchPostUseCase.Input): ISearchPostUseCase.Output {
    const posts = await this.postsRepository.searchMany({ page: input.page, query: input.query })
    const countPosts = await this.postsRepository.countAllPosts({ query: input.query })

    return {
      posts,
      meta: {
        countPosts
      }
    }
  }
}
