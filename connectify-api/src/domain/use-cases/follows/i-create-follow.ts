export interface ICreateFollowUseCase {
    execute(input: ICreateFollowUseCase.Input): ICreateFollowUseCase.Output
}

export namespace ICreateFollowUseCase {
    export type Input = {
      userId: string;
      followedId: string;
    }

    export type Output = Promise<boolean>
}