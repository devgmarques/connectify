import { HashRepository } from "@/entities/hash";

export class HashInMemoryRepository implements HashRepository {
  async compare(string: string, hash: string) {
    const compareStrings = string === hash

    return compareStrings
  }

  async hash(string: string, salt: string) {
    return string
  }
}