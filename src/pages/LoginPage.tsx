import { LoginForm } from '@/features/auth/ui';

type LoginPageProps = {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4">
      <LoginForm onLogin={onLogin} />
    </main>
  )
}