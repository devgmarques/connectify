'use client'

import { useState } from 'react'

import { PiCaretRight } from 'react-icons/pi'
import Link from 'next/link'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import { Post } from '@/@types'

import { FooterCard } from './card-footer'
import { ButtonOpenOperations } from './button-open-operations'

type CardPostProps = {
  data: Post
  isMe?: boolean
}

export function CardPost({ data, isMe = false }: CardPostProps) {
  const [post, setPost] = useState<Post>(data)

  const howManyWordsInBody = post.body.split(' ').length < 30

  const [bodyIsVisible, setBodyIsVisible] =
    useState<boolean>(howManyWordsInBody)

  const indexBelow0ToIndicateThatThisIsDeletedPost = -1

  if (post.id === indexBelow0ToIndicateThatThisIsDeletedPost) {
    return null
  }

  return (
    <article className="w-full px-4 py-3 bg-background rounded-md border border-foreground/20">
      {isMe && (
        <div className="w-full text-end pb-3">
          <ButtonOpenOperations data={post} setData={setPost} />
        </div>
      )}

      <Link
        href={`/${post.user.nickname}`}
        className="flex gap-5 items-center justify-between border-b border-foreground/20 pb-3 whitespace-nowrap overflow-auto"
      >
        <div className="flex gap-3 items-center">
          <Avatar className="z-0 w-10 h-10">
            <AvatarImage src={post.user.url_avatar ?? ''} alt="Avatar" />
            <AvatarFallback>
              {post.user.name.split(' ').map((item) => item[0].toUpperCase())}
            </AvatarFallback>
          </Avatar>

          <h2 className="font-bold text-md text-foreground/80">
            {post.user.nickname}
          </h2>

          <PiCaretRight className="text-foreground" />

          <h3 className="font-bold text-lg text-foreground">
            {post.title
              .split(' ')
              .map(
                (item) =>
                  item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
              )
              .join(' ')}
          </h3>
        </div>

        <span className="text-sm text-foreground/80 whitespace-nowrap hidden sm:block">
          {formatDistanceToNow(post.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
      </Link>

      {!bodyIsVisible ? (
        <>
          <p className="m-auto text-foreground text-medium py-5 break-words overflow-auto">
            {post.body.split(' ', 30).join(' ')}
          </p>
          <button onClick={() => setBodyIsVisible((state) => !state)}>
            ...ler mais
          </button>
        </>
      ) : (
        <p className="m-auto text-foreground text-medium py-5 break-words overflow-auto">
          {post.body}
        </p>
      )}

      <div className="flex flex-col pt-3 gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-foreground/80">
            {post._count.likes} curtidas
          </p>
          <p className="text-xs text-foreground/80">
            {post._count.comments} comentários
          </p>
        </div>

        <FooterCard data={post} setData={setPost} />
      </div>
    </article>
  )
}
