import { User } from '@/types/user'
import { ButtonFollow } from '../follow/button-follow'
import { Follow } from '@/types/follow'
import Link from 'next/link'

type CardUserProps = {
  data: User
  follows: Follow
}

export function CardUser({ data, follows }: CardUserProps) {
  const alreadyFollowing = follows?.following.find(
    (following) => following.followedId === data.id,
  )

  if (alreadyFollowing) {
    return (
      <article className="w-full flex justify-between items-start py-3 border-t border-foreground/20">
        <div>
          <h3 className="text-foreground text-medium text-base">
            {data.nickname}
          </h3>
          <h4 className="text-foreground/80 text-sm mb-2">{data.name}</h4>
          <p className="text-foreground/70 text-xs">{data.details}</p>
        </div>

        <ButtonFollow isFollowing={true} data={data} />
      </article>
    )
  }

  return (
    <article className="w-full flex justify-between items-start py-3 border-t border-foreground/20">
      <Link href={`/${data.nickname}`}>
        <h3 className="text-foreground text-medium text-base">
          {data.nickname}
        </h3>
        <h4 className="text-foreground/80 text-sm mb-2">{data.name}</h4>
        <p className="text-foreground/70 text-xs">{data.details}</p>
      </Link>

      <ButtonFollow data={data} />
    </article>
  )
}
