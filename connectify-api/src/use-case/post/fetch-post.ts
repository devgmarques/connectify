import { PostsRepository } from "../../repositories/post";

type FetchPostsUseCaseRequest = {
  page: number;
};

export class FetchPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ page }: FetchPostsUseCaseRequest) {
    const posts = await this.postsRepository.fetchPosts(page);

    return {
      posts,
    };
  }
}
