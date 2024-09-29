import { Dispatch, SetStateAction } from 'react'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import { Post } from '@/types/post'
import { createComment } from '@/http'
import { Button, Input } from '@/components/ui'

const schemaCommentForm = z.object({
  body: z
    .string()
    .nonempty({ message: 'O comentário não pode ser vazio.' })
    .max(200, 'Deve conter no máximo 200 caracteres.'),
})

type CommentForm = z.infer<typeof schemaCommentForm>

type FormCommentProps = {
  postId: number
  setData: Dispatch<SetStateAction<Post>>
  setIsOpenFormComment: Dispatch<React.SetStateAction<boolean>>
}

export function FormComment({
  postId,
  setData,
  setIsOpenFormComment,
}: FormCommentProps) {
  const { register, handleSubmit, formState } = useForm<CommentForm>({
    resolver: zodResolver(schemaCommentForm),
  })

  async function onSubmit({ body }: CommentForm) {
    try {
      const { comment } = await createComment({ body, postId })

      toast.success('Você realizou um comentário com sucesso.')

      setData((state) => {
        return {
          ...state,
          _count: {
            ...state._count,
            comments: state._count.comments + 1,
          },
          comments: [...state.comments, comment],
        }
      })
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
      setIsOpenFormComment(false)
    }
  }

  return (
    <>
      <header className="my-2 pt-2 border-t border-foreground/20">
        <h3 className="text-lg">Comentários</h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-2 flex justify-center items-center gap-3">
          <Input
            className="w-full"
            placeholder="Digite algo sobre esta publicação"
            {...register('body')}
          />

          <Button
            type="submit"
            className="w-1/4"
            disabled={formState.isSubmitting ?? true}
          >
            Publicar
          </Button>
        </div>

        {formState.errors.body && (
          <span className="mt-2 text-sm text-[#e51e3e]">
            {formState.errors.body.message}
          </span>
        )}
      </form>
    </>
  )
}
