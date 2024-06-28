import { PostsRepository } from "@/entities/post";

type SearchPostUseCaseRequest = {
  query: string;
  page: number;
};

export class SearchPostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute({ page, query }: SearchPostUseCaseRequest) {
    const posts = await this.postsRepository.searchMany(page, query);
    const countPosts = await this.postsRepository.countAllPosts(query)

    return {
      posts,
      meta: {
        countPosts
      }
    };
  }
}
