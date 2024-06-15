'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PiNotePencilBold } from 'react-icons/pi'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'

const schemaEditProfile = z.object({
  name: z.string().nonempty('O nome deve ser preenchido.'),
  details: z.string(),
  nickname: z
    .string()
    .min(3, 'O nome de usuário deve conter nom mínimo 3 dígitos.'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos.'),
})

type EditProfile = z.infer<typeof schemaEditProfile>

type EditProfileProps = {
  data: {
    email: string
    password: string
    details: string | null
    name: string
    nickname: string
  }
}

export function EditProfile({
  data: { details, email, name, nickname, password },
}: EditProfileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit, formState } = useForm<EditProfile>({
    defaultValues: {
      name,
      details: details ?? '',
      nickname,
      password,
    },
    resolver: zodResolver(schemaEditProfile),
  })

  const router = useRouter()

  async function onSubmit({ details, name, nickname, password }: EditProfile) {
    try {
      await api.put('/user', { details, name, nickname, password, email })

      const token = await api.post('/session', { email, password })

      setCookie(
        undefined,
        'connectify.token',
        JSON.stringify(token.data.token),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        },
      )

      router.push('/')

      toast.success('A edição foi feita com sucesso.')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <PiNotePencilBold className="w-5 h-5" />
      </DialogTrigger>

      <DialogContent className="w-72  sm:w-96">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Informe os campos necessários para editar perfil
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Digite seu nome</Label>
            <Input id="name" type="text" {...register('name')} />
            {formState.errors.name && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Digite seu nome de usuário</Label>
            <Input id="nickname" type="text" {...register('nickname')} />
            {formState.errors.nickname && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.nickname.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Digite uma breve descrição</Label>
            <Input id="details" type="text" {...register('details')} />
            {formState.errors.details && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.details.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Digite sua senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {formState.errors.password && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
