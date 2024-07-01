import Image from 'next/image'

import { User } from '@/types/user'
import { Post } from '@/types/post'
import searchEngines from '@/public/images/search-engines.svg'

import { UsersList } from './users-list'
import { PostsList } from './posts-list'
import { NoResults } from './no-results'

type GridProps = {
  posts: Post[]
  users: User[]
  query: string
}

export function Grid({ posts, users, query }: GridProps) {
  return (
    <>
      {users.length === 0 && posts.length === 0 && (
        <div className="w-full overflow-hidden px-7 py-5 flex flex-col bg-background rounded-md border border-foreground/20">
          <Image
            src={searchEngines}
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

      {users.length === 0 && posts.length > 0 && (
        <NoResults message="Nenhum usuário foi encontrado" />
      )}

      {users.length > 0 && (
        <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
          <h2 className="text-foreground text-medium mb-2 text-xl">
            Lista de usuários
          </h2>

          <UsersList users={users} query={query} />
        </section>
      )}

      {posts.length > 0 && (
        <>
          <div className="mt-5 w-full px-4 py-3 flex bg-background rounded-md border border-foreground/20">
            <h2 className="text-foreground text-medium mb-2 text-xl">
              Lista de publicações
            </h2>
          </div>
          <section className="w-full">
            <PostsList posts={posts} query={query} />
          </section>
        </>
      )}

      {posts.length === 0 && users.length > 0 && (
        <NoResults message="Nenhuma publicação foi encontrada" />
      )}
    </>
  )
}
