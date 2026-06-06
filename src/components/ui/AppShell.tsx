import Sidebar from '@/components/ui/Sidebar'
import Header from '@/components/ui/Header'
import DashBoardLayout from '@/components/ui/DashBoardLayout'

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <DashBoardLayout>
                <Sidebar />
                <main className="contents max-lg:block max-lg:min-w-0 max-lg:w-full max-lg:overflow-visible">
                    {children}
                </main>
            </DashBoardLayout>
        </>
    )
}
