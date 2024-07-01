import type { Metadata } from 'next'

import { RegisterForm } from '@/components/pages/accounts/register/register-form'

export const metadata: Metadata = {
  title: 'Register | connectify',
}

export default async function Login() {
  return <RegisterForm />
}
