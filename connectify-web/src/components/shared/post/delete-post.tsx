import { Dispatch, SetStateAction } from 'react'

import { toast } from 'sonner'
import { PiTrashBold } from 'react-icons/pi'
import { AxiosError } from 'axios'

import { Post } from '@/types/post'
import { deletePost } from '@/http/delete-post'
import { Button } from '@/components/ui/button'
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

type DeletePostDialog = {
  id: number
  setData: Dispatch<SetStateAction<Post>>
}

export function DeletePostDialog({ id, setData }: DeletePostDialog) {
  async function handleDeletePost() {
    try {
      await deletePost({ postId: id })

      toast.success('A publicação foi deletada com sucesso.')

      setData((state) => {
        return {
          ...state,
          id: -1,
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
          Deletar publicação
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja deletar esta publicação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
            publicação.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Sair</AlertDialogCancel>

          <AlertDialogAction onClick={handleDeletePost}>
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
