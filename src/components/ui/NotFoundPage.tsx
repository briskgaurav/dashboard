import Link from 'next/link'

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
            <h1 className="text20 font-semibold text-primary">404</h1>
            <p className="text12 text-foreground">Page not found</p>
            <Link
                href="/sales"
                className="text12 font-medium text-link underline-offset-2 hover:underline"
            >
                Go to Sales
            </Link>
        </main>
    )
}
