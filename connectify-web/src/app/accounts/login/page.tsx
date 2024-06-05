import { LoginForm } from '@/components/pages/accounts/login/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | connectify',
}

export default async function Login() {
  return <LoginForm />
}
