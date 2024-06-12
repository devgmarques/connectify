import { PostsRepository } from "@/repositories/post";
import { PostNotExistError } from "../errors/post-not-exist-error";

type RemovePostUseCaseRequest = {
  postId: number
};

export class RemovePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ postId }: RemovePostUseCaseRequest) {
    const findPost = await this.postsRepository.findById(postId)

    if(!findPost){
      throw new PostNotExistError()
    }

    const post = await this.postsRepository.delete(postId);

    return {
      isPostDelete: true,
    };
  }
}
