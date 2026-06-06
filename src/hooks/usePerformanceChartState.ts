'use client'

import {
    usePerformanceChartBrush,
    type ZoomState,
} from '@/hooks/usePerformanceChartBrush'
import { usePerformanceChartFilters } from '@/hooks/usePerformanceChartFilters'
import {
    DEFAULT_SELECTED_METRICS,
    getAxisDomains,
    getDefaultTimeRange,
    getPerformanceChartData,
    getSelectedMetricsSummary,
    getTimeRangeOptions,
    isThirdPartyMetricsSelected,
    PERFORMANCE_CHART_METRICS,
    type PerformanceChartMetric,
    type PerformanceChartPoint,
    type SelectedMetricSummary,
    type TimeRangeOption,
} from '@/utils/performanceAnalytics'
import { exportChartCsv } from '@/utils/performanceChart/exportChart'
import { useCallback, useMemo, useState } from 'react'

export interface PerformanceChartState {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
    timeRange: string
    setTimeRange: React.Dispatch<React.SetStateAction<string>>
    selectedMetrics: string[]
    setSelectedMetrics: React.Dispatch<React.SetStateAction<string[]>>
    packageFilter: string[]
    setPackageFilter: React.Dispatch<React.SetStateAction<string[]>>
    placementFilter: string[]
    setPlacementFilter: React.Dispatch<React.SetStateAction<string[]>>
    targetingFilter: string[]
    setTargetingFilter: React.Dispatch<React.SetStateAction<string[]>>
    creativeFilter: string[]
    setCreativeFilter: React.Dispatch<React.SetStateAction<string[]>>
    productFilter: string[]
    setProductFilter: React.Dispatch<React.SetStateAction<string[]>>
    dspFilter: string[]
    setDspFilter: React.Dispatch<React.SetStateAction<string[]>>
    dealFilter: string[]
    setDealFilter: React.Dispatch<React.SetStateAction<string[]>>
    isThirdPartyMode: boolean
    timeRangeOptions: TimeRangeOption[]
    effectiveTimeRange: string
    chartData: PerformanceChartPoint[]
    visibleRange: { startIndex: number; endIndex: number }
    zoomState: ZoomState
    selectedMetricSummaries: SelectedMetricSummary[]
    axisDomains: { count: number[]; amount: number[]; percent: number[] }
    activeMetrics: PerformanceChartMetric[]
    metricsLabel: string
    hasActiveFilters: boolean
    handleClearAllFilters: () => void
    handleMetricToggle: (metricId: string) => void
    handleClearMetrics: () => void
    handleZoomIn: () => void
    handleZoomOut: () => void
    handleBrushChange: (range: { startIndex?: number; endIndex?: number }) => void
    handleExport: () => void
}

export function usePerformanceChartState(): PerformanceChartState {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [timeRange, setTimeRange] = useState(getDefaultTimeRange())
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(
        DEFAULT_SELECTED_METRICS,
    )

    const isThirdPartyMode = useMemo(
        () => isThirdPartyMetricsSelected(selectedMetrics),
        [selectedMetrics],
    )

    const filters = usePerformanceChartFilters(isThirdPartyMode)

    const timeRangeOptions = useMemo(
        () =>
            getTimeRangeOptions(
                getPerformanceChartData({
                    ...filters.chartFilters,
                    timeRange: 'full',
                }),
            ),
        [filters.chartFilters],
    )

    const effectiveTimeRange = useMemo(() => {
        if (timeRangeOptions.some((option) => option.value === timeRange)) {
            return timeRange
        }
        return timeRangeOptions[0]?.value ?? getDefaultTimeRange()
    }, [timeRange, timeRangeOptions])

    const chartData = useMemo(
        () =>
            getPerformanceChartData({
                ...filters.chartFilters,
                timeRange: effectiveTimeRange,
            }),
        [filters.chartFilters, effectiveTimeRange],
    )

    const dataSignature = useMemo(() => {
        const { chartFilters } = filters
        return isThirdPartyMode
            ? `${chartFilters.packageFilter.join(',')}|${chartFilters.dspFilter.join(',')}|${chartFilters.dealFilter.join(',')}|${effectiveTimeRange}|${chartData.length}`
            : `${chartFilters.packageFilter.join(',')}|${chartFilters.placementFilter.join(',')}|${chartFilters.targetingFilter.join(',')}|${chartFilters.creativeFilter.join(',')}|${chartFilters.productFilter.join(',')}|${effectiveTimeRange}|${chartData.length}`
    }, [filters, isThirdPartyMode, effectiveTimeRange, chartData.length])

    const brush = usePerformanceChartBrush(chartData.length, dataSignature)

    const selectedMetricSummaries = useMemo(
        () => getSelectedMetricsSummary(chartData, selectedMetrics),
        [chartData, selectedMetrics],
    )

    const axisDomains = useMemo(
        () => getAxisDomains(chartData, selectedMetrics),
        [chartData, selectedMetrics],
    )

    const activeMetrics = useMemo(
        () =>
            PERFORMANCE_CHART_METRICS.filter((metric) =>
                selectedMetrics.includes(metric.id),
            ),
        [selectedMetrics],
    )

    const metricsLabel = useMemo(() => {
        if (selectedMetrics.length === 0) return 'Select metrics'
        if (selectedMetrics.length === 1) {
            return (
                PERFORMANCE_CHART_METRICS.find(
                    (item) => item.id === selectedMetrics[0],
                )?.label ?? '1 metric'
            )
        }
        return `${selectedMetrics.length} metrics`
    }, [selectedMetrics])

    const handleMetricToggle = useCallback((metricId: string) => {
        setSelectedMetrics((prev) =>
            prev.includes(metricId)
                ? prev.filter((id) => id !== metricId)
                : [...prev, metricId],
        )
    }, [])

    const handleClearMetrics = useCallback(() => {
        setSelectedMetrics([])
    }, [])

    const handleExport = useCallback(() => {
        exportChartCsv(chartData, activeMetrics, brush.visibleRange)
    }, [activeMetrics, brush.visibleRange, chartData])

    return {
        isCollapsed,
        setIsCollapsed,
        timeRange,
        setTimeRange,
        selectedMetrics,
        setSelectedMetrics,
        packageFilter: filters.packageFilter,
        setPackageFilter: filters.setPackageFilter,
        placementFilter: filters.placementFilter,
        setPlacementFilter: filters.setPlacementFilter,
        targetingFilter: filters.targetingFilter,
        setTargetingFilter: filters.setTargetingFilter,
        creativeFilter: filters.creativeFilter,
        setCreativeFilter: filters.setCreativeFilter,
        productFilter: filters.productFilter,
        setProductFilter: filters.setProductFilter,
        dspFilter: filters.dspFilter,
        setDspFilter: filters.setDspFilter,
        dealFilter: filters.dealFilter,
        setDealFilter: filters.setDealFilter,
        isThirdPartyMode,
        timeRangeOptions,
        effectiveTimeRange,
        chartData,
        visibleRange: brush.visibleRange,
        zoomState: brush.zoomState,
        selectedMetricSummaries,
        axisDomains,
        activeMetrics,
        metricsLabel,
        hasActiveFilters: filters.hasActiveFilters,
        handleClearAllFilters: filters.handleClearAllFilters,
        handleMetricToggle,
        handleClearMetrics,
        handleZoomIn: brush.handleZoomIn,
        handleZoomOut: brush.handleZoomOut,
        handleBrushChange: brush.handleBrushChange,
        handleExport,
    }
}
