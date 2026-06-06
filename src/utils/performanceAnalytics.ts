import sampleData from '../../sample-data.json'

export interface RawDailyMetric {
    date: string
    impressions: number
    clicks: number
    qr_clicks: number
    vcr: number
    time_spent: number
    ssp_spend: number
    ssp_impressions: number
    revenue: number
}

export interface PerformanceChartPoint {
    date: string
    label: string
    impressions: number
    clicks: number
    qr_clicks: number
    vcr: number
    time_spent: number
    ssp_spend: number
    ssp_impressions: number
    revenue: number
    ctr: number
}

export interface SelectedMetricSummary {
    id: keyof PerformanceChartPoint
    label: string
    color: string
    value: number
}

export interface PerformanceChartMetric {
    id: keyof PerformanceChartPoint
    label: string
    type: 'bar' | 'line'
    axis: 'count' | 'amount' | 'percent'
    color: string
    group: 'big-happy' | 'third-party'
}

export interface PerformanceMetricGroup {
    title: string
    metrics: PerformanceChartMetric[]
}

export interface FilterOption {
    label: string
    value: string
}

export interface TimeRangeOption {
    label: string
    value: string
    startDate: string
    endDate: string
}

export type PerformanceFilterMode = 'big-happy' | 'third-party'

export interface PerformanceChartFilters {
    filterMode: PerformanceFilterMode
    packageFilter: string[]
    placementFilter: string[]
    targetingFilter: string[]
    creativeFilter: string[]
    productFilter: string[]
    dspFilter: string[]
    dealFilter: string[]
    timeRange: string
}

function hasSelections(values: string[]): boolean {
    return values.length > 0
}

export const THIRD_PARTY_METRIC_IDS = [
    'ssp_spend',
    'ssp_impressions',
    'revenue',
] as const

export function isThirdPartyMetricsSelected(selectedMetricIds: string[]): boolean {
    return selectedMetricIds.some((id) =>
        THIRD_PARTY_METRIC_IDS.includes(id as (typeof THIRD_PARTY_METRIC_IDS)[number]),
    )
}

export const PERFORMANCE_CHART_METRICS: PerformanceChartMetric[] = [
    { id: 'impressions', label: 'Impressions', type: 'bar', axis: 'count', color: '#1f316d', group: 'big-happy' },
    { id: 'clicks', label: 'Clicks', type: 'bar', axis: 'count', color: '#c4a035', group: 'big-happy' },
    { id: 'qr_clicks', label: 'QR Clicks', type: 'bar', axis: 'count', color: '#a67c2e', group: 'big-happy' },
    { id: 'ctr', label: 'CTR', type: 'line', axis: 'percent', color: '#e8c84a', group: 'big-happy' },
    { id: 'vcr', label: 'VCR', type: 'line', axis: 'percent', color: '#86efac', group: 'big-happy' },
    { id: 'time_spent', label: 'Time Spent', type: 'line', axis: 'count', color: '#6b9fd4', group: 'big-happy' },
    { id: 'ssp_spend', label: 'SSP Spend', type: 'line', axis: 'amount', color: '#d1d5db', group: 'third-party' },
    { id: 'ssp_impressions', label: 'SSP Impressions', type: 'bar', axis: 'count', color: '#5b7fb8', group: 'third-party' },
    { id: 'revenue', label: 'Revenue', type: 'line', axis: 'amount', color: '#4b5e7a', group: 'third-party' },
]

export const PERFORMANCE_METRIC_GROUPS: PerformanceMetricGroup[] = [
    {
        title: 'Big Happy Data',
        metrics: PERFORMANCE_CHART_METRICS.filter((metric) => metric.group === 'big-happy'),
    },
    {
        title: 'Third Party Data',
        metrics: PERFORMANCE_CHART_METRICS.filter((metric) => metric.group === 'third-party'),
    },
]

export const DEFAULT_SELECTED_METRICS = ['impressions', 'ctr']

function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function formatChartLabel(date: string): string {
    const [, month, day] = date.split('-')
    return `${Number(month)}/${Number(day)}`
}

function formatDisplayDate(date: string): string {
    const [year, month, day] = date.split('-')
    return `${month}/${day}/${year}`
}

function computeCtr(impressions: number, clicks: number): number {
    if (impressions === 0) {
        return 0
    }
    return (clicks / impressions) * 100
}

function toChartPoint(metric: RawDailyMetric): PerformanceChartPoint {
    return {
        date: metric.date,
        label: formatChartLabel(metric.date),
        impressions: metric.impressions,
        clicks: metric.clicks,
        qr_clicks: metric.qr_clicks,
        vcr: metric.vcr,
        time_spent: metric.time_spent,
        ssp_spend: metric.ssp_spend,
        ssp_impressions: metric.ssp_impressions,
        revenue: metric.revenue,
        ctr: computeCtr(metric.impressions, metric.clicks),
    }
}

function aggregateMetricsByDate(metricsGroups: RawDailyMetric[][]): RawDailyMetric[] {
    const byDate = new Map<string, RawDailyMetric>()

    for (const metrics of metricsGroups) {
        for (const metric of metrics) {
            const existing = byDate.get(metric.date)

            if (!existing) {
                byDate.set(metric.date, { ...metric })
                continue
            }

            const previousImpressions = existing.impressions
            const totalImpressions = previousImpressions + metric.impressions

            existing.impressions = totalImpressions
            existing.clicks += metric.clicks
            existing.qr_clicks += metric.qr_clicks
            existing.ssp_impressions += metric.ssp_impressions
            existing.ssp_spend += metric.ssp_spend
            existing.revenue += metric.revenue
            existing.time_spent = Math.round(
                (existing.time_spent * previousImpressions +
                    metric.time_spent * metric.impressions) /
                    totalImpressions,
            )
            existing.vcr =
                (existing.vcr * previousImpressions +
                    metric.vcr * metric.impressions) /
                totalImpressions
        }
    }

    return Array.from(byDate.values()).sort((a, b) =>
        a.date.localeCompare(b.date),
    )
}

function getPackageMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    let packages = sampleData.data.package_metrics

    if (hasSelections(filters.packageFilter)) {
        packages = packages.filter((pkg) =>
            filters.packageFilter.includes(`package-${pkg.package_id}`),
        )
    }

    return aggregateMetricsByDate(packages.map((pkg) => pkg.metrics))
}

function getPlacementMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    let placements = sampleData.data.placement_metrics

    if (hasSelections(filters.placementFilter)) {
        placements = placements.filter((placement) =>
            filters.placementFilter.includes(
                `placement-${placement.placement_id}`,
            ),
        )
    }

    return aggregateMetricsByDate(placements.map((placement) => placement.metrics))
}

function getThirdPartyPlacementMetrics(
    filters: PerformanceChartFilters,
): RawDailyMetric[] {
    let placements = sampleData.data.placement_metrics

    if (hasSelections(filters.dspFilter)) {
        placements = placements.filter((placement) =>
            filters.dspFilter.includes(slugify(placement.dsp_provider)),
        )
    }

    if (hasSelections(filters.dealFilter)) {
        placements = placements.filter((placement) =>
            filters.dealFilter.includes(slugify(placement.deal_name)),
        )
    }

    return aggregateMetricsByDate(placements.map((placement) => placement.metrics))
}

function getTargetingMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    let targeting = sampleData.data.targeting_metrics

    if (hasSelections(filters.targetingFilter)) {
        targeting = targeting.filter((item) =>
            filters.targetingFilter.includes(slugify(item.targeting_applied)),
        )
    }

    return aggregateMetricsByDate(targeting.map((item) => item.metrics))
}

function getCreativeMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    let creatives = sampleData.data.creative_metrics

    if (hasSelections(filters.creativeFilter)) {
        creatives = creatives.filter((item) =>
            filters.creativeFilter.includes(`creative-${item.creative_id}`),
        )
    }

    return aggregateMetricsByDate(creatives.map((item) => item.metrics))
}

function getProductMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    let formats = sampleData.data.format_metrics

    if (hasSelections(filters.productFilter)) {
        formats = formats.filter((item) =>
            filters.productFilter.includes(slugify(item.format)),
        )
    }

    return aggregateMetricsByDate(formats.map((item) => item.metrics))
}

function resolveBigHappyRawMetrics(
    filters: PerformanceChartFilters,
): RawDailyMetric[] {
    if (hasSelections(filters.productFilter)) {
        return getProductMetrics(filters)
    }

    if (hasSelections(filters.creativeFilter)) {
        return getCreativeMetrics(filters)
    }

    if (hasSelections(filters.targetingFilter)) {
        return getTargetingMetrics(filters)
    }

    if (hasSelections(filters.placementFilter)) {
        return getPlacementMetrics(filters)
    }

    if (hasSelections(filters.packageFilter)) {
        return getPackageMetrics(filters)
    }

    return getPackageMetrics({ ...filters, packageFilter: [] })
}

function resolveThirdPartyRawMetrics(
    filters: PerformanceChartFilters,
): RawDailyMetric[] {
    if (
        hasSelections(filters.dealFilter) ||
        hasSelections(filters.dspFilter)
    ) {
        return getThirdPartyPlacementMetrics(filters)
    }

    if (hasSelections(filters.packageFilter)) {
        return getPackageMetrics(filters)
    }

    return getThirdPartyPlacementMetrics({
        ...filters,
        dspFilter: [],
        dealFilter: [],
    })
}

function resolveRawMetrics(filters: PerformanceChartFilters): RawDailyMetric[] {
    if (filters.filterMode === 'third-party') {
        return resolveThirdPartyRawMetrics(filters)
    }

    return resolveBigHappyRawMetrics(filters)
}

export function getFilterOptions() {
    return {
        packages: sampleData.data.package_metrics.map((pkg) => ({
            label: pkg.package_name,
            value: `package-${pkg.package_id}`,
        })),
        placements: sampleData.data.placement_metrics.map((placement) => ({
            label: placement.placement_name,
            value: `placement-${placement.placement_id}`,
        })),
        targeting: sampleData.data.targeting_metrics.map((item) => ({
            label: item.targeting_applied,
            value: slugify(item.targeting_applied),
        })),
        creative: sampleData.data.creative_metrics.map((item) => ({
            label: item.creative_name,
            value: `creative-${item.creative_id}`,
        })),
        product: sampleData.data.format_metrics.map((item) => ({
            label: item.format,
            value: slugify(item.format),
        })),
        dsp: Array.from(
            new Set(
                sampleData.data.placement_metrics.map(
                    (placement) => placement.dsp_provider,
                ),
            ),
        ).map((provider) => ({
            label: provider,
            value: slugify(provider),
        })),
        deal: Array.from(
            new Set(
                sampleData.data.placement_metrics.map(
                    (placement) => placement.deal_name,
                ),
            ),
        ).map((dealName) => ({
            label: dealName,
            value: slugify(dealName),
        })),
    }
}

export function getTimeRangeOptions(
    points: PerformanceChartPoint[],
): TimeRangeOption[] {
    if (points.length === 0) {
        return []
    }

    const startDate = points[0].date
    const endDate = points[points.length - 1].date
    const januaryPoints = points.filter((point) => point.date.startsWith('2026-01'))
    const februaryPoints = points.filter((point) => point.date.startsWith('2026-02'))

    const options: TimeRangeOption[] = [
        {
            label: `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`,
            value: 'full',
            startDate,
            endDate,
        },
    ]

    if (januaryPoints.length > 0) {
        options.push({
            label: `${formatDisplayDate(januaryPoints[0].date)} - ${formatDisplayDate(januaryPoints[januaryPoints.length - 1].date)}`,
            value: 'jan-2026',
            startDate: januaryPoints[0].date,
            endDate: januaryPoints[januaryPoints.length - 1].date,
        })
    }

    if (februaryPoints.length > 0) {
        options.push({
            label: `${formatDisplayDate(februaryPoints[0].date)} - ${formatDisplayDate(februaryPoints[februaryPoints.length - 1].date)}`,
            value: 'feb-2026',
            startDate: februaryPoints[0].date,
            endDate: februaryPoints[februaryPoints.length - 1].date,
        })
    }

    return options
}

function filterByTimeRange(
    points: PerformanceChartPoint[],
    timeRange: string,
    timeRangeOptions: TimeRangeOption[],
): PerformanceChartPoint[] {
    const selectedRange = timeRangeOptions.find(
        (option) => option.value === timeRange,
    )

    if (!selectedRange) {
        return points
    }

    return points.filter(
        (point) =>
            point.date >= selectedRange.startDate &&
            point.date <= selectedRange.endDate,
    )
}

export function getPerformanceChartData(
    filters: PerformanceChartFilters,
): PerformanceChartPoint[] {
    const rawMetrics = resolveRawMetrics(filters)
    const allPoints = rawMetrics.map(toChartPoint)
    const timeRangeOptions = getTimeRangeOptions(allPoints)
    const resolvedTimeRange =
        timeRangeOptions.find((option) => option.value === filters.timeRange)
            ?.value ?? timeRangeOptions[0]?.value ?? 'full'

    return filterByTimeRange(allPoints, resolvedTimeRange, timeRangeOptions)
}

export function getSelectedMetricsSummary(
    points: PerformanceChartPoint[],
    selectedMetricIds: string[],
): SelectedMetricSummary[] {
    const totalImpressions = points.reduce(
        (total, point) => total + point.impressions,
        0,
    )
    const totalClicks = points.reduce((total, point) => total + point.clicks, 0)

    return selectedMetricIds
        .map((id) =>
            PERFORMANCE_CHART_METRICS.find((metric) => metric.id === id),
        )
        .filter((metric): metric is PerformanceChartMetric => metric !== undefined)
        .map((metric) => {
            let value = 0

            if (metric.id === 'ctr') {
                value = computeCtr(totalImpressions, totalClicks)
            } else if (metric.id === 'vcr') {
                value =
                    totalImpressions === 0
                        ? 0
                        : points.reduce(
                              (total, point) =>
                                  total + point.vcr * point.impressions,
                              0,
                          ) / totalImpressions
            } else if (metric.id === 'time_spent') {
                value =
                    totalImpressions === 0
                        ? 0
                        : Math.round(
                              points.reduce(
                                  (total, point) =>
                                      total + point.time_spent * point.impressions,
                                  0,
                              ) / totalImpressions,
                          )
            } else {
                value = points.reduce(
                    (total, point) => total + (point[metric.id] as number),
                    0,
                )
            }

            return {
                id: metric.id,
                label: metric.label,
                color: metric.color,
                value,
            }
        })
}

export function getAxisDomains(
    points: PerformanceChartPoint[],
    activeMetricIds: string[],
) {
    const activeMetrics = PERFORMANCE_CHART_METRICS.filter((metric) =>
        activeMetricIds.includes(metric.id),
    )

    const countValues = points.flatMap((point) =>
        activeMetrics
            .filter((metric) => metric.axis === 'count')
            .map((metric) => point[metric.id] as number),
    )
    const amountValues = points.flatMap((point) =>
        activeMetrics
            .filter((metric) => metric.axis === 'amount')
            .map((metric) => point[metric.id] as number),
    )
    const percentValues = points.flatMap((point) =>
        activeMetrics
            .filter((metric) => metric.axis === 'percent')
            .map((metric) => point[metric.id] as number),
    )

    const maxCount = Math.max(...countValues, 0)
    const maxAmount = Math.max(...amountValues, 0)
    const maxPercent = Math.max(...percentValues, 0)

    const roundUp = (value: number, step: number) =>
        value === 0 ? step : Math.ceil(value / step) * step

    return {
        count: [0, roundUp(maxCount, maxCount > 10000 ? 2000 : maxCount > 1000 ? 500 : 50)],
        amount: [0, roundUp(maxAmount, maxAmount > 100 ? 20 : 10)],
        percent: [0, roundUp(maxPercent, maxPercent > 20 ? 20 : 5)],
    }
}

export function getDefaultTimeRange(): string {
    return 'full'
}
