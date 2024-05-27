import { PostsRepository } from "../repositories/post";
import { UsersRepository } from "../repositories/users";

type CreatePostUseCaseRequest = {
  userId: string;
  title: string;
  body: string;
  likes: number;
};

export class CreatePostUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({ userId, body, likes, title }: CreatePostUseCaseRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error("User not exists with this id.");
    }

    const postWithThisTitleAlreadyExistsInTheUser =
      await this.postsRepository.findByTitle(userId, title);

    if (postWithThisTitleAlreadyExistsInTheUser) {
      throw new Error("Post with this title already exists in the user");
    }

    const post = await this.postsRepository.create({
      body,
      title,
      likes,
      userId,
    });

    return {
      post,
    };
  }
}
