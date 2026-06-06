'use client'

import { usePerformanceChart } from './context/PerformanceChartContext'
import PerformanceComboChart from './PerformanceComboChart'
import PerformanceFiltersRow from './PerformanceFiltersRow'
import PerformanceSummaryRow from './PerformanceSummaryRow'

export default function PerformanceChartBody() {
    const {
        chartData,
        activeMetrics,
        axisDomains,
        visibleRange,
        zoomState,
        handleZoomIn,
        handleZoomOut,
        handleBrushChange,
    } = usePerformanceChart()

    return (
        <>
            <PerformanceFiltersRow />
            <PerformanceSummaryRow />
            <PerformanceComboChart
                data={chartData}
                activeMetrics={activeMetrics}
                axisDomains={axisDomains}
                visibleRange={visibleRange}
                zoomState={zoomState}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onBrushChange={handleBrushChange}
            />
        </>
    )
}
