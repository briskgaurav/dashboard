import { tv } from 'tailwind-variants'

const metricChip = tv({
    slots: {
        root: 'flex w-fit flex-col gap-0.5 rounded-md px-2 py-1.5 max-lg:px-3 max-lg:py-2',
        label: 'text8 text-foreground',
        value: 'text8 font-semibold text-primary',
    },
    variants: {
        tone: {
            yellow: { root: 'bg-metric-yellow' },
            gray: { root: 'bg-metric-gray' },
            green: { root: 'bg-metric-green' },
            blue: { root: 'bg-metric-blue' },
            orange: { root: 'bg-metric-orange' },
        },
    },
})

export type MetricChipTone = 'yellow' | 'gray' | 'green' | 'blue' | 'orange'

export interface MetricChipProps {
    label: string
    value: string
    tone: MetricChipTone
    className?: string
}

export default function MetricChip({
    label,
    value,
    tone,
    className,
}: MetricChipProps) {
    const slots = metricChip({ tone })

    return (
        <div className={slots.root({ class: className })}>
            <p className={slots.label()}>{label}</p>
            <p className={slots.value()}>{value}</p>
        </div>
    )
}
