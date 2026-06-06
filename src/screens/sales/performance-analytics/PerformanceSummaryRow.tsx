'use client'

import { tv } from 'tailwind-variants'
import { usePerformanceChart } from './context/PerformanceChartContext'
import { formatMetricSummaryValue } from '@/utils/performanceChart/formatters'

const summaryRow = tv({
    slots: {
        root: 'flex flex-nowrap gap-3 overflow-x-scroll max-lg:flex-wrap max-lg:overflow-x-visible',
        card: 'flex min-w-[8rem] shrink-0 flex-col gap-1 rounded-md bg-metric-gray px-3 py-2',
        label: 'flex items-center gap-1.5 text8 text-foreground',
        swatch: 'size-2.5 shrink-0 rounded-sm',
        value: 'text10 font-semibold text-primary',
    },
})

export default function PerformanceSummaryRow() {
    const slots = summaryRow()
    const { selectedMetricSummaries } = usePerformanceChart()

    return (
        <div className={slots.root()}>
            {selectedMetricSummaries.map((metricSummary) => (
                <div key={metricSummary.id} className={slots.card()}>
                    <p className={slots.label()}>
                        <span
                            className={slots.swatch()}
                            style={{ backgroundColor: metricSummary.color }}
                            aria-hidden
                        />
                        {metricSummary.label}
                    </p>
                    <p className={slots.value()}>
                        {formatMetricSummaryValue(
                            metricSummary.id,
                            metricSummary.value,
                        )}
                    </p>
                </div>
            ))}
        </div>
    )
}
