'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import { authenticate } from '@/http'
import { Button, Input, Label } from '@/components/ui'

import { schemaLoginForm } from './schema'

type LoginForm = z.infer<typeof schemaLoginForm>

export function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schemaLoginForm),
  })

  async function onSubmit({ email, password }: LoginForm) {
    try {
      const { token } = await authenticate({ email, password })

      toast.success('Você entrou em sua conta com sucesso.')

      setCookie(undefined, 'connectify.token', JSON.stringify(token), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      router.push('/feed')
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
    <>
      <Button
        asChild
        variant="ghost"
        className="hidden sm:block sm:absolute sm:top-6 sm:right-6"
      >
        <Link href="/accounts/register">Registrar-se</Link>
      </Button>

      <div className="pt-5 max-w-72 sm:w-96 space-y-6">
        <h2 className="font-bold text-lg">Seja bem vindo novamente!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Digite seu email</Label>

            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="E-mail"
            />
            {errors.email && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Digite senha</Label>

            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Senha"
              showPasswordToggle
            />
            {errors.password && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </form>

        <span className="text-sm sm:hidden">
          Ainda não possui conta?{' '}
          <Link
            href="/accounts/register"
            className="text-blue-400 dark:text-blue-300"
          >
            clique aqui.
          </Link>
        </span>
      </div>
    </>
  )
}
