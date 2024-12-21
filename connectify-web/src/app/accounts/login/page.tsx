import type { Metadata } from 'next'

import { LoginForm } from '@/components/pages/accounts/login'

export const metadata: Metadata = {
  title: 'Entrar | connectify',
}

export default async function Login() {
  return <LoginForm />
}
