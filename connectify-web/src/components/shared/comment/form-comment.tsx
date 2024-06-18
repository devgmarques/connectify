import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const schemaCommentForm = z.object({
  body: z
    .string()
    .nonempty({ message: 'O comentário não pode ser vazio.' })
    .max(200, 'Deve conter no máximo 200 caracteres.'),
})

type CommentForm = z.infer<typeof schemaCommentForm>

type FormCommentProps = {
  postId: number
  setIsOpenFormComment: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormComment({
  postId,
  setIsOpenFormComment,
}: FormCommentProps) {
  const { register, handleSubmit, formState } = useForm<CommentForm>({
    resolver: zodResolver(schemaCommentForm),
  })

  async function onSubmit({ body }: CommentForm) {
    try {
      await api.post(`/posts/${postId}/comments`, { body })

      toast.success('Você realizou um comentário com sucesso.')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    } finally {
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
