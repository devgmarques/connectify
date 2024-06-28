import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { EditUserProfileUseCase } from "./edit-user-profile";
import { NicknameAlreadyExistError } from "../errors/nickname-already-exist-error";
import { UserNotExistError } from "../errors/user-not-exist-error";

let usersRepository: UserInMemoryRepository;
let sup: EditUserProfileUseCase;

describe("Edit user profile use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new EditUserProfileUseCase(usersRepository);


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
  });

  it("should be able to edit on user", async () => {
    const { user } = await sup.execute({
      userId: "user_id",
      data: {
        details: "Editei meu detalhes.",
        email: "gui@gmail.com",
        name: "Guilherme",
        password: "123456",
        nickname: "Gui",
      },
    });

    expect(user).toEqual(expect.objectContaining({
      details: "Editei meu detalhes.",
      email: "gui@gmail.com",
      name: "Guilherme",
      nickname: "Gui",
    }));
  });

  it("should be able to return an user not exists", async () => {
    expect(() =>
      sup.execute({
        userId: "id-not-exists",
        data: {
          details: "Detalhes",
          email: "gui@gmail.com",
          name: "Guilherme",
          password: "123456",
          nickname: "gui",
        },
      })
    ).rejects.toBeInstanceOf(UserNotExistError)
  })

  it("should be able to return an already existing nickname error", async () => {
    usersRepository.users.push({
      id: "user_1",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    expect(
      () =>
        sup.execute({
          userId: "user_id",
          data: {
            details: "Detalhes",
            email: "gui@gmail.com",
            name: "Guilherme",
            password: "123456",
            nickname: "gui",
          },
        })
    ).rejects.toBeInstanceOf(NicknameAlreadyExistError);
  });

  it("should be able to return an already existing nickname error", async () => {
    usersRepository.users.push({
      id: "user_1",
      url_avatar: "https://github/gmarques.png",
      email: "gui@gmail.com",
      name: "Guilherme",
      password: "123456",
      nickname: "gui",
      createdAt: new Date(),
      details: "Sou o desenvolvedor deste projeto.",
    });

    expect(
      () =>
        sup.execute({
          userId: "user_id",
          data: {
            details: "Detalhes",
            email: "gui@gmail.com",
            name: "Guilherme",
            password: "123456",
            nickname: "gui",
          },
        })
    ).rejects.toBeInstanceOf(NicknameAlreadyExistError);
  });
});
