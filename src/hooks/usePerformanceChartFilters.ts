'use client'

import { useCallback, useMemo, useState } from 'react'

export function usePerformanceChartFilters(isThirdPartyMode: boolean) {
    const [packageFilter, setPackageFilter] = useState<string[]>([])
    const [placementFilter, setPlacementFilter] = useState<string[]>([])
    const [targetingFilter, setTargetingFilter] = useState<string[]>([])
    const [creativeFilter, setCreativeFilter] = useState<string[]>([])
    const [productFilter, setProductFilter] = useState<string[]>([])
    const [dspFilter, setDspFilter] = useState<string[]>([])
    const [dealFilter, setDealFilter] = useState<string[]>([])

    const chartFilters = useMemo(
        () => ({
            filterMode: isThirdPartyMode
                ? ('third-party' as const)
                : ('big-happy' as const),
            packageFilter,
            placementFilter,
            targetingFilter,
            creativeFilter,
            productFilter,
            dspFilter,
            dealFilter,
        }),
        [
            isThirdPartyMode,
            packageFilter,
            placementFilter,
            targetingFilter,
            creativeFilter,
            productFilter,
            dspFilter,
            dealFilter,
        ],
    )

    const hasActiveFilters = useMemo(() => {
        if (isThirdPartyMode) {
            return (
                packageFilter.length > 0 ||
                dspFilter.length > 0 ||
                dealFilter.length > 0
            )
        }

        return (
            packageFilter.length > 0 ||
            placementFilter.length > 0 ||
            targetingFilter.length > 0 ||
            creativeFilter.length > 0 ||
            productFilter.length > 0
        )
    }, [
        isThirdPartyMode,
        packageFilter,
        placementFilter,
        targetingFilter,
        creativeFilter,
        productFilter,
        dspFilter,
        dealFilter,
    ])

    const handleClearAllFilters = useCallback(() => {
        setPackageFilter([])
        setPlacementFilter([])
        setTargetingFilter([])
        setCreativeFilter([])
        setProductFilter([])
        setDspFilter([])
        setDealFilter([])
    }, [])

    return {
        packageFilter,
        setPackageFilter,
        placementFilter,
        setPlacementFilter,
        targetingFilter,
        setTargetingFilter,
        creativeFilter,
        setCreativeFilter,
        productFilter,
        setProductFilter,
        dspFilter,
        setDspFilter,
        dealFilter,
        setDealFilter,
        chartFilters,
        hasActiveFilters,
        handleClearAllFilters,
    }
}
