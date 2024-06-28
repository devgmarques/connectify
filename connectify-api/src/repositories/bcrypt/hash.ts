import { HashRepository } from "@/entities/hash";
import { compare, hash } from "bcryptjs";

export class HashBcryptRepository implements HashRepository {
  async compare(string: string, hash: string) {
    const hashCompare = await compare(string, hash)

    return hashCompare
  }

  async hash(string: string, salt: string) {
    const stringHashed = await hash(string, salt)

    return stringHashed
  }
}