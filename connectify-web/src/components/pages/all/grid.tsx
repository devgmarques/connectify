import Image from 'next/image'
import searchEngines from '@/public/images/search-engines.svg'

import { User } from '@/types/user'
import { Post } from '@/types/post'
import { UsersList } from './users-list'
import { PostsList } from './posts-list'

type GridProps = {
  posts: Post[]
  users: User[]
  query: string
}

export function Grid({ posts, users, query }: GridProps) {
  return (
    <>
      {users.length === 0 && posts.length === 0 && (
        <section className="w-full overflow-hidden px-7 py-5 flex flex-col bg-background rounded-md border border-foreground/20">
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
        </section>
      )}

      {users.length === 0 && posts.length > 0 && (
        <section className="w-full mt-5 px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
          <h2 className="text-foreground text-medium mb-2 text-xl">
            Nenhum usuário foi encontrado
          </h2>

          <p className="text-base text-foreground/70">
            Tente diminuir ou reescrever seus termos de pesquisa.
          </p>
        </section>
      )}

      {users.length > 0 && (
        <section className="w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
          <h2 className="text-foreground text-medium mb-2 text-xl">
            Lista de usuários
          </h2>

          {query && <UsersList users={users} query={query} />}
          {!query && <UsersList users={users} />}
        </section>
      )}

      {posts.length > 0 && (
        <>
          <div className="mt-5 w-full px-4 py-3 flex bg-background rounded-md border border-foreground/20">
            <h2 className="text-foreground text-medium mb-2 text-xl">
              Lista de publicação
            </h2>
          </div>

          <section className="w-full">
            {query && <PostsList posts={posts} query={query} />}
            {!query && <PostsList posts={posts} />}
          </section>
        </>
      )}

      {posts.length === 0 && users.length > 0 && (
        <section className="mt-5 w-full px-4 py-3 flex flex-col bg-background rounded-md border border-foreground/20">
          <h2 className="text-foreground text-medium mb-2 text-xl">
            Nenhuma publicação foi encontrado
          </h2>

          <p className="text-base text-foreground/70">
            Tente diminuir ou reescrever seus termos de pesquisa.
          </p>
        </section>
      )}
    </>
  )
}
