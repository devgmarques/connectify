import { PostsRepository } from "@/repositories/post";

type SearchPostUseCaseRequest = {
  query: string;
  page: number;
};

export class SearchPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ page, query }: SearchPostUseCaseRequest) {
    const posts = await this.postsRepository.searchMany(page, query);

    return {
      posts,
    };
  }
}
