import MetricHeading from '@/components/ui/MetricHeading'
import { BarChart, Eye } from 'lucide-react'
import { tv } from 'tailwind-variants'

const card = tv({
    slots: {
        root: "bg-background-secondary padd space-y-4 h-full items-start justify-between rounded-lg max-lg:flex max-lg:w-full max-lg:flex-col max-lg:gap-4 max-lg:space-y-0 max-lg:min-h-0",
        row: "flex items-center gap-4",
        count: "text20 font-semibold text-primary",
        chartButton: "size-[1.5vw] shrink-0 rounded-md bg-background p-1 max-lg:size-8",
        chartIcon: "size-full text-primary",
    }
})

export default function ImpressionsCard() {
    const slots = card()

    return (
        <div className={slots.root()}>
            <MetricHeading
                icon={
                    <Eye
                        color="currentColor"
                        className="size-full text-success"
                        aria-hidden
                    />
                }
                title="Impressions"
                trend="6.7%"
            />
            <div className={slots.row()}>
                <p className={slots.count()}>1,317,004</p>
                <button className={slots.chartButton()}>
                    <BarChart color='currentColor' strokeWidth={5} className={slots.chartIcon()} />
                </button>
            </div>
        </div>
    )
}
