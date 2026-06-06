'use client'

import Button from '@/components/ui/Button'
import DropdownWithLabel from '@/components/ui/DropdownWithLabel'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { tv } from 'tailwind-variants'
import { usePerformanceChart } from './context/PerformanceChartContext'
import { PERFORMANCE_METRIC_DROPDOWN_GROUPS } from '@/utils/performanceChart/metricGroups'

const header = tv({
    slots: {
        root: 'mb-4 flex items-start justify-between gap-4 max-lg:flex-col max-lg:items-start',
        title: 'text20 font-semibold text-primary',
        controls:
            'flex shrink-0 items-center gap-3 max-lg:w-full max-lg:flex-wrap max-lg:shrink',
        collapseButton:
            'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    },
})

export default function PerformanceChartHeader() {
    const slots = header()
    const {
        isCollapsed,
        setIsCollapsed,
        timeRangeOptions,
        effectiveTimeRange,
        setTimeRange,
        handleExport,
        selectedMetrics,
        setSelectedMetrics,
    } = usePerformanceChart()

    return (
        <div className={slots.root()}>
            <h2 className={slots.title()}>Performance Analytics</h2>

            <div className={slots.controls()}>
                <DropdownWithLabel
                    label="Time"
                    mode="single"
                    value={effectiveTimeRange}
                    options={timeRangeOptions}
                    onChange={setTimeRange}
                    className="w-48 max-lg:min-w-0 max-lg:flex-1"
                />

                <DropdownWithLabel
                    label="Metrics"
                    mode="multiple"
                    values={selectedMetrics}
                    groups={PERFORMANCE_METRIC_DROPDOWN_GROUPS}
                    onChange={setSelectedMetrics}
                    clearable
                    menuAlign="right"
                    className="min-w-36 max-lg:min-w-0 max-lg:flex-1"
                    emptyLabel="Select metrics"
                />

                <Button title="Export" onClick={handleExport} />

                <button
                    type="button"
                    className={slots.collapseButton()}
                    aria-label={
                        isCollapsed
                            ? 'Expand performance analytics'
                            : 'Collapse performance analytics'
                    }
                    aria-expanded={!isCollapsed}
                    onClick={() => setIsCollapsed((prev) => !prev)}
                >
                    {isCollapsed ? (
                        <ChevronDown className="size-4" aria-hidden />
                    ) : (
                        <ChevronUp className="size-4" aria-hidden />
                    )}
                </button>
            </div>
        </div>
    )
}
