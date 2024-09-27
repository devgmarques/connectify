export class UserNotExistError extends Error {
  constructor() {
    super("Usuario não existe. Verifique os dados.")
  }
}
