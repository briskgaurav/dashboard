'use client'

import { tv } from 'tailwind-variants'
import PerformanceChartBody from './PerformanceChartBody'
import PerformanceChartHeader from './PerformanceChartHeader'
import { PerformanceChartProvider, usePerformanceChart } from './context/PerformanceChartContext'

const performanceChart = tv({
    slots: {
        root: 'flex w-full flex-col gap-4 rounded-lg bg-background-secondary padd',
    },
})

function PerformanceChartContent() {
    const slots = performanceChart()
    const { isCollapsed } = usePerformanceChart()

    return (
        <section className={slots.root()}>
            <PerformanceChartHeader />
            {!isCollapsed ? <PerformanceChartBody /> : null}
        </section>
    )
}

export default function PerformanceChart() {
    return (
        <PerformanceChartProvider>
            <PerformanceChartContent />
        </PerformanceChartProvider>
    )
}
