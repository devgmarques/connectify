export class EmailAlreadyExistError extends Error {
  constructor() {
    super("E-mail já existe. Por favor insira outro e-mail.")
  }
}
