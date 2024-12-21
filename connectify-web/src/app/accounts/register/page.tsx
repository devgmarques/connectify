import type { Metadata } from 'next'

import { RegisterForm } from '@/components/pages/accounts/register'

export const metadata: Metadata = {
  title: 'Registrar-se | connectify',
}

export default async function Login() {
  return <RegisterForm />
}
