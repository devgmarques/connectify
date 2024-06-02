import { CommentRepository } from "@/repositories/comment";
import { PostsRepository } from "@/repositories/post";
import { PostNotExistError } from "../errors/post-not-exist-error";

type CreateCommentInPostUseCaseRequest = {
  title: string;
  body: string;
  postId: number;
};

export class CreateCommentInPostUseCase {
  constructor(
    private commentsRepository: CommentRepository,
    private postsRepository: PostsRepository
  ) {}

  async execute({ body, postId, title }: CreateCommentInPostUseCaseRequest) {
    const postById = await this.postsRepository.findById(postId);

    if (!postById) {
      throw new PostNotExistError()
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
