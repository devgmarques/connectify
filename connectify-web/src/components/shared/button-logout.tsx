'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import { toast } from 'sonner'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

interface ButtonLogoutProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function ButtonLogout({ children, ...props }: ButtonLogoutProps) {
  const router = useRouter()

  function logOut() {
    destroyCookie(null, 'connectify.token')

    toast.success('Você saiu de sua conta com sucesso.')

    router.push('/accounts/login')
  }

  return (
    <Button {...props} variant="outline" onClick={logOut}>
      {children}
    </Button>
  )
}
