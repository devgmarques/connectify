import { beforeEach, describe, expect, it } from "vitest";

import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { RemovePostUseCase } from "./remove-post";

let postsRepository: PostsInMemoryRepository;
let sup: RemovePostUseCase;

describe("Fetch post use case", () => {
  beforeEach(() => {
    postsRepository = new PostsInMemoryRepository();
    sup = new RemovePostUseCase(postsRepository);
  });

  it("should be able to remove posts", async () => {
    postsRepository.posts.push({
      id: 0,
      body: "",
      title: "",
      author: "",
      userId: "user_01",
      createdAt: new Date(),
    });

    const { isPostDelete } = await sup.execute({
      postId: 0
    });

    expect(isPostDelete).toBe(true);
  });
});
