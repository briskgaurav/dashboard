import {
    BarChart2,
    Bot,
    Calendar,
    CircleDollarSign,
    Scale,
    Target,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react'
import { tv } from 'tailwind-variants'

const METRIC_ICONS = {
    'average-pacing': Target,
    'projected-pacing': Bot,
    'even-daily-spend': Scale,
    'average-daily-spend': BarChart2,
    'daily-spend-budget': Calendar,
    'io-budget': CircleDollarSign,
    'deal-budget': CircleDollarSign,
    'remaining-budget': CircleDollarSign,
    'daily-increase-needed': CircleDollarSign,
} as const satisfies Record<string, LucideIcon>

const METRIC_LABELS = {
    'average-pacing': 'Average Pacing',
    'projected-pacing': 'Projected Pacing',
    'even-daily-spend': 'Even Daily Spend',
    'average-daily-spend': 'Average Daily Spend',
    'daily-spend-budget': 'Daily Spend for Bud...',
    'io-budget': 'IO Budget',
    'deal-budget': 'Deal Budget',
    'remaining-budget': 'Remaining Budget',
    'daily-increase-needed': 'Daily Increase Needed',
} as const

export type BudgetMetricId = keyof typeof METRIC_LABELS

const budgetMetricRow = tv({
    slots: {
        row: 'flex items-center justify-between gap-2',
        left: 'flex min-w-0 items-center gap-2',
        iconWrap: 'size-[1.1vw] shrink-0 text-primary max-lg:size-4',
        label: 'truncate text8 text-disabled',
        right: 'flex shrink-0 items-center gap-1',
        trendIcon: 'size-[0.9vw] text-success max-lg:size-3.5',
        value: 'text8 font-semibold text-primary',
    },
})

export interface BudgetMetricRowProps {
    id: BudgetMetricId
    value: string
    trend?: boolean
}

export default function BudgetMetricRow({
    id,
    value,
    trend,
}: BudgetMetricRowProps) {
    const slots = budgetMetricRow()
    const Icon = METRIC_ICONS[id]

    return (
        <div className={slots.row()}>
            <div className={slots.left()}>
                <div className={slots.iconWrap()}>
                    <Icon className="size-full" aria-hidden />
                </div>
                <span className={slots.label()}>{METRIC_LABELS[id]}</span>
            </div>
            <div className={slots.right()}>
                {trend ? (
                    <TrendingUp className={slots.trendIcon()} aria-hidden />
                ) : null}
                <span className={slots.value()}>{value}</span>
            </div>
        </div>
    )
}
