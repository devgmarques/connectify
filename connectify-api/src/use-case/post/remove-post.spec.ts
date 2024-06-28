import { beforeEach, describe, expect, it } from "vitest";

import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { RemovePostUseCase } from "./remove-post";
import { PostNotExistError } from "../errors/post-not-exist-error";

let postsRepository: PostsInMemoryRepository;
let sup: RemovePostUseCase;

describe("Remove post use case", () => {
  beforeEach(() => {
    postsRepository = new PostsInMemoryRepository();
    sup = new RemovePostUseCase(postsRepository);
  });

  it("should be able to remove posts", async () => {
    postsRepository.posts.push({
      id: 1,
      userId: "user_id",
      title: "Novo titulo",
      author: "developer",
      body: "Body editado",
      createdAt: new Date()
    })

    const { isPostDelete } = await sup.execute({
      postId: 1
    });

    expect(isPostDelete).toBe(true);
  });

  it("should be able to return error post not exist", async () => {
    expect(() => sup.execute({
      postId: 1
    })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
});
