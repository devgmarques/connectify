export class NicknameAlreadyExistError extends Error {
  constructor() {
    super(
      "O nome de usuario já existe. Por favor insira outro nome de usuario."
    )
  }
}
