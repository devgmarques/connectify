import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../repositories/in-memory/users-in-memory";
import { PostsInMemoryRepository } from "../repositories/in-memory/posts-in-memory-repository";
import { CommentInMemoryRepository } from "../repositories/in-memory/comments-in-memory-repository";
import { CreateCommentsInPostUseCase } from "./create-comments-in-post";

let usersRepository: UserInMemoryRepository;
let commentRepository: CommentInMemoryRepository;
let postsRepository: PostsInMemoryRepository;
let sup: CreateCommentsInPostUseCase;

describe("Create post use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    commentRepository = new CommentInMemoryRepository();
    postsRepository = new PostsInMemoryRepository();
    sup = new CreateCommentsInPostUseCase(commentRepository, postsRepository);
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
      likes: 0,
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
