export class PostNotExistError extends Error {
  constructor() {
    super(
      "A postagem expecificado não existe."
    )
  }
}
