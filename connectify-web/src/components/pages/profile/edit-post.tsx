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
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { Post } from '@/types/post'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiNotePencilBold } from 'react-icons/pi'
import { toast } from 'sonner'
import { z } from 'zod'

const schemaEditPost = z.object({
  title: z.string().nonempty({ message: 'O titulo não pode ser vazio.' }),
  body: z.string().nonempty({ message: 'O corpo não pode ser vazio.' }),
})

type CreatePost = z.infer<typeof schemaEditPost>

type EditPostDialogProps = {
  data: Post
}

export function EditPostDialog({ data }: EditPostDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { register, handleSubmit, formState } = useForm<CreatePost>({
    defaultValues: {
      title: data.title,
      body: data.body,
    },
    resolver: zodResolver(schemaEditPost),
  })

  async function onSubmit({ body, title }: CreatePost) {
    try {
      await api.put(`/me/posts/${data.id}`, {
        body,
        title,
        id: data.id,
        author: data.author,
        createdAt: data.createdAt,
        userId: data.userId,
      })

      toast.success('A postagem foi editada com sucesso.')
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
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-3 bg-transparent hover:bg-transparent p-0 m-0"
        >
          <PiNotePencilBold className="w-5 h-5" />
          Editar esta postagem
        </Button>
      </DialogTrigger>

      <DialogContent className="w-72 sm:w-96">
        <DialogHeader>
          <DialogTitle>Editar postagem</DialogTitle>
          <DialogDescription>
            Informe os campos necessários para editar sua postagem
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Digite o titulo</Label>
            <Input id="title" type="text" {...register('title')} />
            {formState.errors.title && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Digite o corpo</Label>
            <Textarea id="body" {...register('body')} />
            {formState.errors.body && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {formState.errors.body.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={formState.isSubmitting ?? true}
          >
            Criar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
