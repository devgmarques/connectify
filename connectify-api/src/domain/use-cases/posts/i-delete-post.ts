export interface IDeletePostUseCase {
  execute(input: IDeletePostUseCase.Input): IDeletePostUseCase.Output
}

export namespace IDeletePostUseCase {
  export type Input = {
    postId: number
  }

  export type Output = Promise<void>
}