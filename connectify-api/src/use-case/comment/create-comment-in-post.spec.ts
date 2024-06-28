import { beforeEach, describe, expect, it } from "vitest";

import { CreateCommentInPostUseCase } from "./create-comment-in-post";
import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { CommentInMemoryRepository } from "../../repositories/in-memory/comments-in-memory-repository";
import { PostsInMemoryRepository } from "../../repositories/in-memory/posts-in-memory-repository";
import { PostNotExistError } from "../errors/post-not-exist-error";

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

    usersRepository.users.push({
      id: "user_id",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "developer",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });


    postsRepository.posts.push({
      id: 0,
      userId: "user_01",
      author: "",
      body: "Globo",
      title: "Sobre RS",
      createdAt: new Date(),
    });
  });

  it("should be able to create comment", async () => {
    const { comment } = await sup.execute({
      postId: 0,
      userId: "user_01",
      body: "Não concordo com sua opinião",
    });

    expect(comment).toEqual(expect.objectContaining({
      userId: "user_01",
    }));
  });

  it("should be able to return error post not exist", async () => {
    expect(() =>
      sup.execute({
        postId: 1,
        userId: "user_01",
        body: "Não concordo com sua opinião",
      })
    ).rejects.toBeInstanceOf(PostNotExistError)
  })
});
