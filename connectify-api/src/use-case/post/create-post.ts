import { PostsRepository } from "@/repositories/post";
import { TitleAlreadyExistInUserError } from "../errors/title-already-exist-in-user-error";

type CreatePostUseCaseRequest = {
  userId: string;
  data: {
    title: string;
    body: string;
    author: string;
  };
};

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ userId, data: { body, title, author } }: CreatePostUseCaseRequest) {
    const postWithThisTitleAlreadyExistsInTheUser =
      await this.postsRepository.findByTitle(userId, title);

    if (postWithThisTitleAlreadyExistsInTheUser) {
      throw new TitleAlreadyExistInUserError();
    }

    const post = await this.postsRepository.create({
      body,
      title,
      author,
      userId,
    });

    return {
      post,
    };
  }
}
