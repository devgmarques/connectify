'use client'

import { useRouter } from 'next/navigation'

import { LuHome, LuUser } from 'react-icons/lu'
import { destroyCookie } from 'nookies'
import { toast } from 'sonner'
import { LogOut } from 'lucide-react'

import { ActiveLink } from './active-link'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const router = useRouter()

  function logOut() {
    destroyCookie(null, 'connectify.token')

    toast.success('Você se saiu de sua conta com sucesso.')

    router.push('/accounts/login')
  }

  return (
    <aside className="w-56 h-full fixed p-4 pb-20 bg-foreground/90 space-y-5 flex flex-col justify-between">
      <div>
        <ActiveLink href="/feed">
          <LuHome />
          <span>Inicio</span>
        </ActiveLink>

        <ActiveLink href="/me">
          <LuUser />
          <span>Perfil</span>
        </ActiveLink>
      </div>

      <Button variant="outline" onClick={logOut}>
        <LogOut />
      </Button>
    </aside>
  )
}
