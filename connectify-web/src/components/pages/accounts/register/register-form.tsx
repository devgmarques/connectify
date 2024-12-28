'use client'

import { z } from 'zod'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'

import { authenticate, registerUser } from '@/http'
import { Button, Input, Label } from '@/components/ui'

import { schemaRegisterForm } from './schema'

type RegisterForm = z.infer<typeof schemaRegisterForm>

export function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schemaRegisterForm),
  })

  async function onSubmit({ email, name, nickname, password }: RegisterForm) {
    try {
      await registerUser({ email, name, nickname, password })

      const { token } = await authenticate({ email, password })

      setCookie(undefined, 'connectify.token', JSON.stringify(token), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      router.push('/feed')

      toast.success('Você registrou-se com sucesso.')
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
        <Link href="/accounts/login">Entrar</Link>
      </Button>

      <div className="py-10 max-w-72 sm:w-96 space-y-6">
        <h2 className="font-bold text-lg">Registre-se agora mesmo!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Digite seu nome</Label>

            <Input
              id="name"
              type="text"
              {...register('name')}
              placeholder="Nome"
            />
            {errors.name && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Digite seu nome de usuário</Label>

            <Input
              id="nickname"
              type="text"
              {...register('nickname')}
              placeholder="Nome de usuário"
            />

            {errors.nickname && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.nickname.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Digite seu e-mail</Label>

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
            <Label htmlFor="password">Digite sua senha</Label>

            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Senha"
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
            Registrar-se
          </Button>
        </form>

        <span className="text-sm sm:hidden">
          Já possui conta?{' '}
          <Link
            href="/accounts/login"
            className="text-blue-400 dark:text-blue-300"
          >
            clique aqui.
          </Link>
        </span>
      </div>
    </>
  )
}
