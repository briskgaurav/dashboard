import MetricChip from '@/components/ui/MetricChip'
import MetricHeading from '@/components/ui/MetricHeading'
import { PERFORMANCE_METRICS } from '@/__mock__/performanceMetrics'
import { Activity } from 'lucide-react'
import { tv } from 'tailwind-variants'

const performanceCard = tv({
    slots: {
        root: 'flex h-full w-[18vw] flex-col items-start justify-between gap-4 rounded-lg bg-background-secondary padd max-lg:h-auto max-lg:min-h-[12rem] max-lg:w-full',
        chipsWrapper: 'flex w-full flex-wrap gap-2'
    }
})

export default function PerformanceCard() {
    const slots = performanceCard();
    return (
        <div className={slots.root()}>
            <MetricHeading
                icon={
                    <Activity
                        color="currentColor"
                        className="size-full text-primary"
                        aria-hidden
                    />
                }
                title="Performance"
                trend="0%"
            />

            <div className={slots.chipsWrapper()}>
                {PERFORMANCE_METRICS.map((metric) => (
                    <MetricChip
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        tone={metric.tone}
                    />
                ))}
            </div>
        </div>
    )
}
