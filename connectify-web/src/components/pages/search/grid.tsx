import Image from 'next/image'

import { Post, User } from '@/@types'

import { UsersList } from './users-list'
import { PostsList } from './posts-list'
import { NoResults } from './no-results'

type UserDataProps = {
  users: User[]
  meta: {
    countUsers: number
  }
}

type PostDataProps = {
  posts: Post[]
  meta: {
    countPosts: number
  }
}

type GridProps = {
  postsData: PostDataProps
  usersData: UserDataProps
  query: string
}

export function Grid({ postsData, usersData, query }: GridProps) {
  const userLengthBigger0 = usersData.users.length > 0
  const postLengthBigger0 = postsData.posts.length > 0

  return (
    <>
      {!userLengthBigger0 && !postLengthBigger0 && (
        <div className="w-full overflow-hidden px-7 py-5 flex flex-col bg-background rounded-md border border-foreground/20">
          <Image
            src="/images/search-engines.svg"
            alt="Pesquisar novamente"
            className="max-w-full sm:max-w-96 m-auto"
          />

          <h2 className="mt-5 text-center text-foreground text-medium mb-2 text-xl">
            Nenhum resultado foi encontrado
          </h2>

          <p className="text-base text-center text-foreground/70">
            Tente diminuir ou reescrever seus termos de pesquisa.
          </p>
        </div>
      )}

      {!userLengthBigger0 && postLengthBigger0 && (
        <NoResults message="Nenhum usuário foi encontrado" />
      )}

      {userLengthBigger0 && (
        <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
          <h2 className="text-foreground text-medium text-xl">
            Lista de usuários
          </h2>

          <span className="text-sm text-foreground/70 mb-5">
            cerca de {usersData.meta.countUsers} resultados
          </span>

          <UsersList users={usersData.users} query={query} />
        </section>
      )}

      {postLengthBigger0 && (
        <>
          <div className="mt-5 w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
            <h2 className="text-foreground text-medium text-xl">
              Lista de publicações
            </h2>

            <span className="text-sm text-foreground/70 mb-5">
              cerca de {postsData.meta.countPosts} resultados
            </span>
          </div>
          <section className="w-full">
            <PostsList posts={postsData.posts} query={query} />
          </section>
        </>
      )}

      {!postLengthBigger0 && userLengthBigger0 && (
        <NoResults message="Nenhuma publicação foi encontrada" />
      )}
    </>
  )
}
