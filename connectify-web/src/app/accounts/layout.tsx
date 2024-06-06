import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

import { PiHandshake } from 'react-icons/pi'

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const token = cookieStore.get('connectify.token')?.value

  if (token) {
    redirect('/feed')
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex h-24 md:h-full flex-col justify-between md:border-r md:border-foreground/5 bg-primary p-10 text-foreground antialiased">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <PiHandshake size={20} />
          <span className="font-semibold">connectify</span>
        </div>

        <footer className="text-sm hidden md:block">
          Direito reservados &copy; connectify - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
