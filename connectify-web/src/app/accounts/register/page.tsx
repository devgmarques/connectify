import { RegisterForm } from '@/components/pages/accounts/register/register-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | connectify',
}

export default async function Login() {
  return <RegisterForm />
}
