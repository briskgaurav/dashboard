import {
    type PerformanceChartMetric,
    type PerformanceChartPoint,
} from '@/utils/performanceAnalytics'

export function exportChartCsv(
    data: PerformanceChartPoint[],
    activeMetrics: PerformanceChartMetric[],
    visibleRange: { startIndex: number; endIndex: number },
) {
    const exportData = data.slice(
        visibleRange.startIndex,
        visibleRange.endIndex + 1,
    )
    const headers = ['Date', ...activeMetrics.map((metric) => metric.label)]
    const rows = exportData.map((point) => [
        point.label,
        ...activeMetrics.map((metric) => point[metric.id]),
    ])
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'performance-analytics.csv'
    link.click()
    URL.revokeObjectURL(url)
}
