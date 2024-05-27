import { CommentRepository } from "../repositories/comment";
import { PostsRepository } from "../repositories/post";

type CreateCommentsInPostUseCaseRequest = {
  title: string;
  body: string;
  postId: number;
};

export class CreateCommentsInPostUseCase {
  constructor(
    private commentsRepository: CommentRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({ body, postId, title }: CreateCommentsInPostUseCaseRequest) {
    const postById = await this.postsRepository.findById(postId);

    if (!postById) {
      throw new Error("Post not exists with this id.");
    }

    const comment = await this.commentsRepository.create({
      body,
      title,
      postId,
    });

    return {
      comment,
    };
  }
}
