import { SideNav } from '@/components/dashboard'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 lg:w-72">
        <SideNav />
      </div>
      <div className="grow p-3 md:overflow-y-auto md:p-8 lg:p-12">
        {children}
      </div>
    </div>
  )
}
