import { ReactNode } from 'react'

import { Suggestions } from '@/components/shared/suggestions'

type ProfileLayoutProps = {
  children: ReactNode
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-24 flex-1 h-full grid grid-cols-1 sm:grid-cols-[1fr_286px]">
        <div>{children}</div>

        <div className="hidden pr-5 sm:block">
          <Suggestions />
        </div>
      </div>
    </div>
  )
}
