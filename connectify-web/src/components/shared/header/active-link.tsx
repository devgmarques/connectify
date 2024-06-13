'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type ActiveLink = ComponentProps<typeof Link>

export function ActiveLink(props: ActiveLink) {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      data-current={pathname === props.href}
      className="flex w-full px-3 py-2 rounded-md items-center gap-1.5 text-md font-medium text-foreground/60 transition-colors hover:text-foreground/20 data-[current=true]:text-foreground"
    ></Link>
  )
}
