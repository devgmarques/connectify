import { User } from '@/types/user'

type CardUserProps = {
  data: User
}

export function CardUser({ data }: CardUserProps) {
  return (
    <article className="w-full flex justify-between items-start py-3 border-t border-foreground/20">
      <div>
        <h3 className="text-foreground text-medium text-base">
          {data.nickname}
        </h3>
        <h4 className="text-foreground/80 text-sm mb-2">{data.name}</h4>
        <p className="text-foreground/70 text-xs">{data.details}</p>
      </div>

      <button className="text-blue-500 dark:text-blue-400 text-md font-bold">
        Seguir
      </button>
    </article>
  )
}
