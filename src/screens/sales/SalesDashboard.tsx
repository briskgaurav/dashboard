import CampaignOverview from '@/screens/sales/campaign-overview/CampaignOverview'
import AnalyticsWrapper from '@/components/ui/AnalyticsWrapper'
import RightSideBar from '@/components/ui/RightSideBar'
import KpiCards from '@/screens/sales/kpi-cards/KpiCards'
import PerformanceChart from '@/screens/sales/performance-analytics/PerformanceChart'


export default function SalesDashboard() {
    return (
        <RightSideBar>
            <CampaignOverview />
            <AnalyticsWrapper>
                <KpiCards />
                <PerformanceChart />
            </AnalyticsWrapper>
        </RightSideBar>
    )
}
