'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'

const schemaRegisterForm = z.object({
  name: z.string().nonempty('O nome deve ser preenchido.'),
  nickname: z
    .string()
    .min(3, 'O nome de usuário deve conter nom mínimo 3 dígitos.'),
  email: z.string().email({ message: 'Email invalido.' }),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 dígitos.'),
})

type RegisterForm = z.infer<typeof schemaRegisterForm>

export function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schemaRegisterForm),
  })

  async function onSubmit({ email, name, nickname, password }: RegisterForm) {
    try {
      await api.post('/user', {
        email,
        name,
        nickname,
        password,
      })

      const token = await api.post('/session', {
        email,
        password,
      })

      setCookie(
        undefined,
        'connectify.token',
        JSON.stringify(token.data.token),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        },
      )

      router.push('/feed')

      toast.success('Você foi cadastrado com sucesso, aguarde.')
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
        <Link href="/accounts/login">Fazer Login</Link>
      </Button>

      <div className="py-10 max-w-72 sm:w-96 space-y-6">
        <h2 className="font-bold text-lg">Faça seu registro agora mesmo!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Digite seu nome</Label>
            <Input id="name" type="text" {...register('name')} />
            {errors.name && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname">Digite seu nome de usuário</Label>
            <Input id="nickname" type="text" {...register('nickname')} />
            {errors.nickname && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.nickname.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Digite seu email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Digite sua senha</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <span className="mt-2 text-sm text-[#e51e3e]">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            Entrar
          </Button>
        </form>

        <span className="text-sm sm:hidden">
          Já possui conta?{' '}
          <Link href="/accounts/login" className="text-primary">
            clique aqui.
          </Link>
        </span>
      </div>
    </>
  )
}
