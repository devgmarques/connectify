import { CommentRepository } from "@/repositories/comment";
import { PostsRepository } from "@/repositories/post";
import { PostNotExistError } from "../errors/post-not-exist-error";

type CreateCommentInPostUseCaseRequest = {
  body: string;
  postId: number;
  userId: string;
};

export class CreateCommentInPostUseCase {
  constructor(
    private commentsRepository: CommentRepository,
    private postsRepository: PostsRepository
  ) { }

  async execute({ body, postId, userId }: CreateCommentInPostUseCaseRequest) {
    const postById = await this.postsRepository.findById(postId);

    if (!postById) {
      throw new PostNotExistError()
    }

    const comment = await this.commentsRepository.create({
      body,
      postId,
      userId
    });

    return {
      comment,
    };
  }
}
