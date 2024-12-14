import { AcmeLogo } from '@/components/acme-logo'
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-3 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-primary p-3 md:h-36">
          <AcmeLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
