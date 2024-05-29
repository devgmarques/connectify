export class CreadentialsAlreadyExistError extends Error {
  constructor() {
    super("Creadentials already exists.");
  }
}
