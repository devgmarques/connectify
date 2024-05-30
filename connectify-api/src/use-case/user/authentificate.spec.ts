import { beforeEach, describe, expect, it } from "vitest";

import { UserInMemoryRepository } from "../../repositories/in-memory/users-in-memory";
import { AuthentificateUseCase } from "./authentificate";

let usersRepository: UserInMemoryRepository;
let sup: AuthentificateUseCase;

describe("Authentificate use case", () => {
  beforeEach(() => {
    usersRepository = new UserInMemoryRepository();
    sup = new AuthentificateUseCase(usersRepository);
  });

  it("should be able to create authentification", async () => {
    usersRepository.users.push({
      id: "user_01",
      name: "Guilherme",
      email: "gui@gmail.com",
      password: "$2y$10$oN/tZaQOBdreMyLn2TlkH.Di6DmK2TE05VxEu4i5SxMMm/dx/ABDa",
      nickname: "",
      details: "",
      createdAt: new Date(),
    });

    const { user } = await sup.execute({
      email: "gui@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
