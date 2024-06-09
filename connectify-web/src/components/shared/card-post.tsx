import { Button } from '@/components/ui/button'
import { Post } from '@/types/post'
import { PiCaretRight, PiHeartBold, PiNoteLight } from 'react-icons/pi'

type CardPostProps = {
  data: Post
}

export function CardPost({ data }: CardPostProps) {
  return (
    <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
      <div className="space-y-5 pb-3 border-b border-foreground/20">
        <div className="flex gap-3 items-center border-b border-foreground/20">
          <h2 className="font-bold text-md text-foreground/80">
            {data.author}
          </h2>

          <PiCaretRight className="text-foreground" />

          <h3 className="font-bold text-lg text-foreground">{data.title}</h3>
        </div>

        <p className="text-foreground text-medium">{data.body}</p>
      </div>

      <div className="flex pt-3 gap-3">
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
