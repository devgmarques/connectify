export type HashRepository = {
  hash(string: string, salt: string): Promise<string>;
  compare(string: string, hash: string): Promise<boolean>;
}