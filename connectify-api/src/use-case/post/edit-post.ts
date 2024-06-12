import { PostsRepository } from "@/repositories/post";
import { TitleAlreadyExistInUserError } from "../errors/title-already-exist-in-user-error";

type EditPostUseCaseRequest = {
  userId: string;
  data: {
    id: number,
    body: string,
    title: string,
    author: string,
    userId: string,
    createdAt: string,
  };
};

export class EditPostUseCase {
  constructor(private postsRepository: PostsRepository) { }

  async execute({ userId, data: { author, body, createdAt, id, title, userId: idUser } }: EditPostUseCaseRequest) {
    const postWithThisTitleAlreadyExistsInTheUser =
      await this.postsRepository.findByTitle(userId, title);

    if (postWithThisTitleAlreadyExistsInTheUser) {
      throw new TitleAlreadyExistInUserError();
    }

    const post = await this.postsRepository.update({
      author,
      body,
      createdAt: new Date(createdAt),
      id,
      title,
      userId: idUser
    });

    return {
      post,
    };
  }
}
