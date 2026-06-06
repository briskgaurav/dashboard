import CampaigDelivery from '@/screens/sales/kpi-cards/CampaigDelivery'
import DealBudgetCard from '@/screens/sales/kpi-cards/DealBudgetCard'
import IoBudgetCard from '@/screens/sales/kpi-cards/IoBudgetCard'
import PerformanceCard from '@/screens/sales/kpi-cards/PerformanceCard'
import ImpressionsCard from './ImpressionsCard'

export default function KpiCards() {
    return (
        <div className="flex h-[45vh] flex-nowrap items-start justify-start gap-4 overflow-x-scroll max-lg:h-auto max-lg:flex-col max-lg:overflow-x-visible">
            <div className="flex h-full w-fit flex-col gap-4 max-lg:h-auto max-lg:w-full">
                <ImpressionsCard />
                <PerformanceCard />
            </div>
            <CampaigDelivery />
            <IoBudgetCard />
            <DealBudgetCard />
        </div>
    )
} 