import { DEAL_BUDGET, FLIGHT_FILTER_OPTIONS_FOR_DEAL_BUDGET } from '@/__mock__/budgetCards'
import BudgetCard from '@/screens/sales/kpi-cards/BudgetCard'

export default function DealBudgetCard() {
    return (
        <BudgetCard
            title="Deal Budget"
            filterOptions={[...FLIGHT_FILTER_OPTIONS_FOR_DEAL_BUDGET]}
            gauge={DEAL_BUDGET.gauge}
            averagePacing={DEAL_BUDGET.averagePacing}
            projectedPacing={DEAL_BUDGET.projectedPacing}
            expandedMetrics={[...DEAL_BUDGET.expandedMetrics]}
            footerMetrics={[...DEAL_BUDGET.footerMetrics]}
        />
    )
}
