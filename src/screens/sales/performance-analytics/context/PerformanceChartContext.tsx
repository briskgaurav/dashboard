'use client'

import { createContext, useContext } from 'react'
import {
    usePerformanceChartState,
    type PerformanceChartState,
} from '@/hooks/usePerformanceChartState'

const PerformanceChartContext = createContext<PerformanceChartState | null>(
    null,
)

export function PerformanceChartProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const value = usePerformanceChartState()

    return (
        <PerformanceChartContext.Provider value={value}>
            {children}
        </PerformanceChartContext.Provider>
    )
}

export function usePerformanceChart(): PerformanceChartState {
    const context = useContext(PerformanceChartContext)

    if (!context) {
        throw new Error(
            'usePerformanceChart must be used within PerformanceChartProvider',
        )
    }

    return context
}
