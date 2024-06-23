import { Post } from '@/types/post'
import { PiCaretRight } from 'react-icons/pi'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ButtonOpenOperations } from './button-open-operations'
import Link from 'next/link'
import { FooterCard } from './footer-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
        href={`/${data.user.nickname}`}
        className="flex gap-5 items-center justify-between border-b border-foreground/20 pb-3 whitespace-nowrap overflow-auto"
      >
        <div className="flex gap-3 items-center">
          <Avatar className="z-0 w-10 h-10">
            <AvatarImage src={data.user.url_avatar ?? ''} alt="Avatar" />
            <AvatarFallback>
              {data.user.name.split(' ').map((item) => item[0].toUpperCase())}
            </AvatarFallback>
          </Avatar>

          <h2 className="font-bold text-md text-foreground/80">
            {data.user.nickname}
          </h2>

          <PiCaretRight className="text-foreground" />

          <h3 className="font-bold text-lg text-foreground">
            {data.title
              .split(' ')
              .map(
                (item) =>
                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
              )
              .join(' ')}
          </h3>
        </div>

        <span className="text-sm text-foreground/80 whitespace-nowrap hidden sm:block">
          {formatDistanceToNow(data.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </Link>

      <p className="m-auto text-foreground text-medium py-5 break-words overflow-auto">
        {data.body}
      </p>

      <div className="flex flex-col pt-3 gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-foreground/80">
            {data._count.likes} curtidas
          </p>
          <p className="text-xs text-foreground/80">
            {data._count.comments} comentários
          </p>
        </div>

        <FooterCard data={data} />
      </div>
    </article>
  )
}
