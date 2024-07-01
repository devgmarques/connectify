import { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  if (!isAuthenticated()) {
    redirect('/accounts/login')
  }

  return <>{children}</>
}
