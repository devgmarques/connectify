'use client'

import { ButtonHTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'

import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { destroyCookie } from 'nookies'

import { Button } from '../ui/button'

export function ButtonLogout(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  function logOut() {
    destroyCookie(null, 'connectify.token')

    toast.success('Você se saiu de sua conta com sucesso.')

    router.push('/accounts/login')
  }

  return (
    <Button {...props} variant="outline" onClick={logOut}>
      <LogOut />
    </Button>
  )
}
