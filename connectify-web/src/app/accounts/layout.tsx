import React from 'react'

import { PiHandshake } from 'react-icons/pi'

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex h-24 md:h-full flex-col justify-between md:border-r md:border-foreground/5 bg-primary p-10 text-foreground antialiased">
        <div className="flex items-center gap-2 text-lg text-background">
          <PiHandshake size={20} />
          <span className="font-semibold">connectify</span>
        </div>

        <footer className="text-sm hidden md:block text-background">
          Direito reservados &copy;connectify
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
