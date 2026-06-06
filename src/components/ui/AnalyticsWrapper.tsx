import React from 'react'

export default function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto max-lg:overflow-visible">
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    )
}
