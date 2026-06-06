import MetricHeading from '@/components/ui/MetricHeading'
import RingMeter from '@/components/ui/RingMeter'
import { BarChart2 } from 'lucide-react'
import { tv } from 'tailwind-variants'

const campaignDeliveryCard = tv({
    slots: {
        wrapper:
            'flex h-full w-[18vw] flex-col items-center justify-between gap-6 rounded-lg bg-background-secondary padd max-lg:h-auto max-lg:min-h-[280px] max-lg:w-full',
    },
})

export default function CampaigDelivery() {
    const styles = campaignDeliveryCard()

    return (
        <div className={styles.wrapper()}>
            <MetricHeading
                icon={
                    <BarChart2
                        color="currentColor"
                        strokeWidth={5}
                        className="size-full text-primary"
                        aria-hidden
                    />
                }
                title="Campaign Delivery"
            />

            <RingMeter
                filledValue={1_317_004}
                totalValue={1_448_704}
                label="Delivered"
                filledLabel="Delivered"
                totalLabel="Contracted"
            />
        </div>
    )
}
