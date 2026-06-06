import React from 'react'

export default function RightSideBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-[87vh] min-h-0 w-full flex-col gap-4 overflow-hidden max-lg:h-auto max-lg:overflow-visible">
            {children}
        </div>
    )
}
