import { Button } from '@/components/ui/button'
import { Post } from '@/types/post'
import { PiCaretRight, PiHeartBold, PiNoteLight } from 'react-icons/pi'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ButtonOpenOperations } from './button-open-operations'

type CardPostProps = {
  data: Post
  isMe?: boolean
}

export function CardPost({ data, isMe = false }: CardPostProps) {
  return (
    <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
      {isMe && (
        <div className="w-full text-end">
          <ButtonOpenOperations data={data} />
        </div>
      )}

      <div className="space-y-5 py-3">
        <div className="flex gap-5 items-center justify-between border-b border-foreground/20 pb-3 whitespace-nowrap overflow-auto">
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
        </div>

        <p className="w-full text-foreground text-medium overflow-auto pb-3">
          {data.body}
        </p>
      </div>

      <div className="flex pt-5 gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <PiHeartBold className="text-foreground" />
          <span className="font-medium text-sm text-foreground">Gostei</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <PiNoteLight className="text-foreground" />
          <span className="font-medium text-sm text-foreground">Comentar</span>
        </Button>
      </div>
    </article>
  )
}
