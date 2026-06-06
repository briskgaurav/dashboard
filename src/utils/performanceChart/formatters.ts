export function formatCount(value: number): string {
    if (value >= 1000) {
        return `${Math.round(value / 1000)}k`
    }
    return String(value)
}

export function formatMetricSummaryValue(metricId: string, value: number): string {
    if (metricId === 'ctr' || metricId === 'vcr') {
        return `${value.toFixed(1)}%`
    }
    if (metricId === 'ssp_spend' || metricId === 'revenue') {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    }
    if (metricId === 'time_spent') {
        return `${Math.round(value)}s`
    }
    return value.toLocaleString('en-US')
}

export function formatTooltipValue(dataKey: string, value: number): string {
    if (dataKey === 'ctr' || dataKey === 'vcr') {
        return `${value.toFixed(1)}%`
    }
    if (dataKey === 'ssp_spend' || dataKey === 'revenue') {
        return `$${value.toFixed(2)}`
    }
    if (dataKey === 'time_spent') {
        return `${Math.round(value)}s`
    }
    return value.toLocaleString('en-US')
}
