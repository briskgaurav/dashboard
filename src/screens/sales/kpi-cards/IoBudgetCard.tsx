import { FLIGHT_FILTER_OPTIONS_FOR_IO_BUDGET, IO_BUDGET } from '@/__mock__/budgetCards'
import BudgetCard from '@/screens/sales/kpi-cards/BudgetCard'

export default function IoBudgetCard() {
    return (
        <BudgetCard
            title="IO Budget"
            filterOptions={[...FLIGHT_FILTER_OPTIONS_FOR_IO_BUDGET]}
            gauge={IO_BUDGET.gauge}
            averagePacing={IO_BUDGET.averagePacing}
            projectedPacing={IO_BUDGET.projectedPacing}
            expandedMetrics={[...IO_BUDGET.expandedMetrics]}
            footerMetrics={[...IO_BUDGET.footerMetrics]}
        />
    )
}
