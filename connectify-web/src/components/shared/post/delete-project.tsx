import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { PiTrashBold } from 'react-icons/pi'
import { toast } from 'sonner'

type DeletePostDialog = {
  id: number
}

export function DeletePostDialog({ id }: DeletePostDialog) {
  async function deletePost() {
    try {
      await api.delete(`/me/posts/${id}`)

      toast.success('A postagem foi deletada com sucesso.')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message)

          return
        }
      }

      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-3 bg-transparent hover:bg-transparent p-0 m-0 text-red-500 dark:text-red-400"
        >
          <PiTrashBold className="text-red-500 dark:text-red-400 w-5 h-5" />
          Deletar projeto
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja deletar esta postagem?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            postagem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Sair</AlertDialogCancel>

          <AlertDialogAction onClick={deletePost}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
