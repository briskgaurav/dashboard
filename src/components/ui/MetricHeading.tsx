import { TrendingUp } from 'lucide-react'
import { tv } from 'tailwind-variants'

const metricHeading = tv({
    slots: {
        root: 'flex w-full items-center gap-2',
        left: 'flex items-center gap-2',
        iconWrap:
            'flex size-[2vw] items-center justify-center rounded-lg bg-background p-1.5 max-lg:size-8',
        title: 'text10 font-semibold text-primary',
        trend: 'flex items-center justify-center gap-1',
        trendIconWrap: 'size-[1vw] shrink-0 text-success max-lg:size-4',
        trendValue: 'text8 font-semibold text-primary',
    },
})

export interface MetricHeadingProps {
    icon: React.ReactNode
    title: string
    trend?: string
    trendIcon?: React.ReactNode
    className?: string
}

export default function MetricHeading({
    icon,
    title,
    trend,
    trendIcon,
    className,
}: MetricHeadingProps) {
    const slots = metricHeading()

    return (
        <div className={slots.root({ class: className })}>
            <div className={slots.left()}>
                <div className={slots.iconWrap()}>{icon}</div>
                <p className={slots.title()}>{title}</p>
            </div>

            {trend ? (
                <div className={slots.trend()}>
                    <div className={slots.trendIconWrap()}>
                        {trendIcon ?? (
                            <TrendingUp
                                color="currentColor"
                                className="size-full"
                                aria-hidden
                            />
                        )}
                    </div>
                    <p className={slots.trendValue()}>{trend}</p>
                </div>
            ) : null}
        </div>
    )
}
