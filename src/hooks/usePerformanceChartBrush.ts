'use client'

import { useCallback, useMemo, useState } from 'react'
import { MIN_VISIBLE_POINTS } from '@/utils/performanceChart/constants'

export interface BrushRange {
    startIndex: number
    endIndex: number
    dataSignature: string
}

export interface ZoomState {
    canZoomIn: boolean
    canZoomOut: boolean
}

export function usePerformanceChartBrush(
    chartDataLength: number,
    dataSignature: string,
) {
    const [brushRange, setBrushRange] = useState<BrushRange>({
        startIndex: 0,
        endIndex: 0,
        dataSignature: '',
    })

    const visibleRange = useMemo(() => {
        const endIndex = Math.max(chartDataLength - 1, 0)

        if (brushRange.dataSignature !== dataSignature) {
            return { startIndex: 0, endIndex }
        }

        return {
            startIndex: Math.min(brushRange.startIndex, endIndex),
            endIndex: Math.min(brushRange.endIndex, endIndex),
        }
    }, [brushRange, chartDataLength, dataSignature])

    const zoomState = useMemo((): ZoomState => {
        if (chartDataLength === 0) {
            return { canZoomIn: false, canZoomOut: false }
        }

        const visibleCount =
            visibleRange.endIndex - visibleRange.startIndex + 1
        const nextZoomInCount = Math.max(
            MIN_VISIBLE_POINTS,
            Math.floor(visibleCount * 0.7),
        )

        return {
            canZoomIn:
                visibleCount > MIN_VISIBLE_POINTS &&
                nextZoomInCount < visibleCount,
            canZoomOut:
                visibleRange.startIndex > 0 ||
                visibleRange.endIndex < chartDataLength - 1,
        }
    }, [chartDataLength, visibleRange])

    const updateBrushRange = useCallback(
        (startIndex: number, endIndex: number) => {
            setBrushRange({ startIndex, endIndex, dataSignature })
        },
        [dataSignature],
    )

    const handleZoomIn = useCallback(() => {
        if (chartDataLength === 0) return

        const currentCount = visibleRange.endIndex - visibleRange.startIndex + 1
        const nextCount = Math.max(
            MIN_VISIBLE_POINTS,
            Math.floor(currentCount * 0.7),
        )
        if (nextCount >= currentCount) return

        const trim = Math.floor((currentCount - nextCount) / 2)
        const startIndex = Math.min(
            visibleRange.startIndex + trim,
            chartDataLength - nextCount,
        )
        updateBrushRange(startIndex, startIndex + nextCount - 1)
    }, [chartDataLength, updateBrushRange, visibleRange])

    const handleZoomOut = useCallback(() => {
        if (chartDataLength === 0) return

        const currentCount = visibleRange.endIndex - visibleRange.startIndex + 1
        const nextCount = Math.min(chartDataLength, Math.ceil(currentCount / 0.7))

        if (nextCount >= chartDataLength) {
            updateBrushRange(0, chartDataLength - 1)
            return
        }

        const expand = Math.floor((nextCount - currentCount) / 2)
        const startIndex = Math.max(0, visibleRange.startIndex - expand)
        updateBrushRange(
            startIndex,
            Math.min(chartDataLength - 1, startIndex + nextCount - 1),
        )
    }, [chartDataLength, updateBrushRange, visibleRange])

    const handleBrushChange = useCallback(
        (range: { startIndex?: number; endIndex?: number }) => {
            if (
                range.startIndex === undefined ||
                range.endIndex === undefined
            ) {
                return
            }
            updateBrushRange(range.startIndex, range.endIndex)
        },
        [updateBrushRange],
    )

    return {
        visibleRange,
        zoomState,
        handleZoomIn,
        handleZoomOut,
        handleBrushChange,
    }
}
