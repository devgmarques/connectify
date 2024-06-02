export class PostNotExistError extends Error {
  constructor() {
    super(
      "O post expecificado não existe."
    );
  }
}
