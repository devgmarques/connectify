import { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { Header } from '@/components/shared/header/header'
import { isAuthenticated } from '@/auth/auth'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  if (!isAuthenticated()) {
    redirect('/accounts/login')
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl m-auto">{children}</div>
    </>
  )
}
