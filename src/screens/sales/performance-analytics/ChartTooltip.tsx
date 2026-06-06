import { PERFORMANCE_CHART_METRICS, type PerformanceChartPoint } from '@/utils/performanceAnalytics'
import { formatTooltipValue } from '@/utils/performanceChart/formatters'

interface ChartTooltipEntry {
    dataKey: string
    value: number
    color: string
    payload?: PerformanceChartPoint
}

interface ChartTooltipProps {
    active?: boolean
    payload?: ChartTooltipEntry[]
    label?: string
}

export default function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
    if (!active || !payload?.length) {
        return null
    }

    return (
        <div className="rounded-md border border-border bg-background-secondary px-3 py-2 shadow-md">
            <p className="mb-1 text8 font-semibold text-primary">{label}</p>
            {payload.map((entry) => {
                const metric = PERFORMANCE_CHART_METRICS.find(
                    (item) => item.id === entry.dataKey,
                )

                return (
                    <p
                        key={entry.dataKey}
                        className="text8 text-foreground"
                        style={{ color: entry.color }}
                    >
                        {metric?.label ?? entry.dataKey}:{' '}
                        {formatTooltipValue(entry.dataKey, entry.value)}
                    </p>
                )
            })}
        </div>
    )
}
