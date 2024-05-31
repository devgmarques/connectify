export class TitleAlreadyExistInUserError extends Error{
  constructor(){
    super("O titulo já existe em sua conta. Por favor digite outro.")
  }
}