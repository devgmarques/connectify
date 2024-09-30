import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { Follow, User } from '@/@types'

import { ButtonFollow } from '../follow'

type CardUserProps = {
  data: User
  follows: Follow
  widthAvatar: 'sm' | 'lg'
}

export function CardUser({ data, follows, widthAvatar }: CardUserProps) {
  const alreadyFollowing = follows?.following.find(
    (following) => following.followedId === data.id,
  )

  const firstName = data.name.split(' ', 1)

  if (alreadyFollowing) {
    return (
      <div
        className="flex items-center justify-between w-full"
        key={data.nickname}
      >
        <Link href={`/${data.nickname}`} className="flex items-center gap-2">
          <Avatar
            className={`z-0 ${widthAvatar === 'sm' ? 'w-8 h-8' : 'w-12 h-12'}`}
          >
            <AvatarImage src={data.url_avatar} alt="Avatar" />
            <AvatarFallback>
              {firstName.map((letter) => letter[0].toUpperCase())}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0">
            <h3 className="text-base">{firstName}</h3>
            <span className="text-sm text-foreground/70">@{data.nickname}</span>
          </div>
        </Link>

        <ButtonFollow isFollowing={true} data={data} />
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-between w-full"
      key={data.nickname}
    >
      <Link href={`/${data.nickname}`} className="flex items-center gap-2">
        <Avatar
          className={`z-0 ${widthAvatar === 'sm' ? 'w-8 h-8' : 'w-10 h-10'}`}
        >
          <AvatarImage src={data.url_avatar} alt="Avatar" />
          <AvatarFallback>
            {firstName.map((letter) => letter[0].toUpperCase())}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0">
          <h3 className="text-base">{firstName}</h3>
          <span className="text-sm text-foreground/70">@{data.nickname}</span>
        </div>
      </Link>

      <ButtonFollow data={data} />
    </div>
  )
}
