export interface ICreateLikeUseCase {
  execute(input: ICreateLikeUseCase.Input): ICreateLikeUseCase.Output
}

export namespace ICreateLikeUseCase {
  export type Input = {
    postId: number;
    userId: string;
  }

  export type Output = Promise<boolean>
}