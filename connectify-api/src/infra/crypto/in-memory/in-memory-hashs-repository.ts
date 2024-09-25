import { HashRepository } from "@/application/protocols/crypto/hash-repository"

export class InMemoryHashRepository implements HashRepository {
  async create(input: HashRepository.Create.Input): HashRepository.Create.Output {
    return input.string
  }

  async compare(input: HashRepository.Compare.Input): HashRepository.Compare.Output {
    return input.string === input.hash
  }
}