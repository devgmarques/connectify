'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const schemaEditAvatar = z.object({
  file: z.any(),
})

type EditAvatar = z.infer<typeof schemaEditAvatar>

type EditAvatarDialogProps = {
  data: User
}

export function EditAvatarDialog({ data }: EditAvatarDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit } = useForm<EditAvatar>({
    resolver: zodResolver(schemaEditAvatar),
  })

  async function onSubmit(data: EditAvatar) {
    try {
      console.log()

      if (data.file.length < 1) {
        toast.error('Envie o arquivo corretamente.')
        return
      }

      await api.postForm('/user/upload/avatar', {
        file: data.file,
      })

      toast.success('A troca da imagem foi feita com sucesso.')
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
        <Avatar className="z-0 w-20 h-20">
          <AvatarImage src={data.url_avatar} alt="Avatar" />
          <AvatarFallback>
            {data.name.split(' ').map((item) => item[0].toUpperCase())}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent className="w-72 sm:w-[400px] space-y-4">
        <DialogHeader>
          <DialogTitle>Foto de perfil</DialogTitle>
        </DialogHeader>

        <Avatar className="m-auto z-0 w-52 h-52">
          <AvatarImage src={data.url_avatar} alt="Avatar" />
          <AvatarFallback>
            {data.name.split(' ').map((item) => item[0])}
          </AvatarFallback>
        </Avatar>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input
            type="file"
            placeholder="Adicione uma imagem"
            {...register('file')}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
