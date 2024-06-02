import { beforeEach, describe, expect, it } from "vitest";

import { CreateCommentInPostUseCase } from "./create-comment-in-post";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { CommentInMemoryRepository } from "../../repositories/in-memory/comments-in-memory-repository";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";

let usersRepository: UserInMemoryRepository;
let commentRepository: CommentInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreateCommentInPostUseCase;

describe("Create comment in post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    commentRepository = new CommentInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreateCommentInPostUseCase(commentRepository, postsRepository);
  });

  it("should be able to create comment", async () => {
    usersRepository.users.push({
      createdAt: new Date(),
      id: "user_01",
      details: "",
      nickname: "",
      email: "gui@gmail",
      name: "Guilherme",
      password: "123456",
    });

    postsRepository.posts.push({
      id: 0,
      userId: "user_01",
      body: "Globo",
      title: "Sobre RS",
      createdAt: new Date(),
    });

    const { comment } = await sup.execute({
      postId: 0,
      title: "Discordo nesse assunto",
      body: "Não concordo com sua opinião",
    });

    expect(comment.id).toEqual(expect.any(Number));
  });
});
