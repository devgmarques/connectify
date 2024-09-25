import { Post } from "@/domain/entities"

export type PostsRepository = {
  create(input: PostsRepository.Create.Input): PostsRepository.Create.Output
  update(input: PostsRepository.Update.Input): PostsRepository.Update.Output
  delete(input: PostsRepository.Delete.Input): PostsRepository.Delete.Output
  countAllPosts(input: PostsRepository.CountAllPosts.Input): PostsRepository.CountAllPosts.Output
  findPostForUser(input: PostsRepository.FindPostForUser.Input): PostsRepository.FindPostForUser.Output
  searchMany(input: PostsRepository.SearchMany.Input): PostsRepository.SearchMany.Output
  findMany(input: PostsRepository.FindMany.Input): PostsRepository.FindMany.Output
  findByTitle(input: PostsRepository.FindByTitle.Input): PostsRepository.FindByTitle.Output
  findById(input: PostsRepository.FindById.Input): PostsRepository.FindById.Output
}

export namespace PostsRepository {
  export namespace Create {
    export type Input = {
      postId?: number
      title: string
      body: string
      author: string
      userId: string
    }

    export type Output = Promise<Post>
  }
  
  export namespace Update {    
    export type Input = Post

    export type Output = Promise<Post>
  }

  export namespace Delete {
    export type Input = {
      postId: number
    }

    export type Output = Promise<void>
  }

  export namespace CountAllPosts {
    export type Input = {
      query: string
    }

    export type Output = Promise<number>
  }

  export namespace FindPostForUser {
    export type Input = {
      userId: string
    }

    export type Output = Promise<Post[]>
  }

  export namespace SearchMany {
    export type Input = {
      page: number, 
      query: string
    }

    export type Output = Promise<Post[]>
  }

  export namespace FindMany {
    export type Input = {
      page: number
    }

    export type Output = Promise<Post[]>
  }

  export namespace FindByTitle {
    export type Input = {
      userId: string, 
      title: string
    }

    export type Output = Promise<Post | null>
  }

  export namespace FindById {
    export type Input = {
      postId: number 
    }

    export type Output = Promise<Post | null>
  }
}