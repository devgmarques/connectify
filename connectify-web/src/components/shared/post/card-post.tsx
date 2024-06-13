import { Button } from '@/components/ui/button'
import { Post } from '@/types/post'
import { PiCaretRight } from 'react-icons/pi'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ButtonOpenOperations } from './button-open-operations'
import Link from 'next/link'
import { LuMessageCircle } from 'react-icons/lu'
import { ButtonLike } from '../like/button-like'

type CardPostProps = {
  data: Post
  isMe?: boolean
}

export function CardPost({ data, isMe = false }: CardPostProps) {
  return (
    <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
      {isMe && (
        <div className="w-full text-end pb-3">
          <ButtonOpenOperations data={data} />
        </div>
      )}

      <Link
        href={`/${data.author}`}
        className="flex gap-5 items-center justify-between border-b border-foreground/20 pb-3 whitespace-nowrap overflow-auto"
      >
        <div className="flex gap-3 items-center">
          <h2 className="font-bold text-md text-foreground/80">
            {data.author}
          </h2>

          <PiCaretRight className="text-foreground" />

          <h3 className="font-bold text-lg text-foreground">{data.title}</h3>
        </div>

        <span className="text-sm text-foreground/80 whitespace-nowrap hidden sm:block">
          {formatDistanceToNow(data.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </Link>

      <p className="text-center m-auto text-foreground text-medium py-5 break-words overflow-auto">
        {data.body}
      </p>

      <div className="flex flex-col pt-3 gap-2 border-t border-foreground/20">
        <div className="flex items-center justify-between">
          <p className="text-xs text-foreground/80">
            {data._count.likes} curtidas
          </p>
          <p className="text-xs text-foreground/80">0 compartilhamentos</p>
        </div>

        <div className="flex justify-between gap-3">
          <ButtonLike data={data} />

          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <LuMessageCircle className="text-foreground" />
            <span className="font-medium text-sm text-foreground">
              Comentar
            </span>
          </Button>
        </div>
      </div>
    </article>
  )
}