import type { LabeledDropdownGroup } from '@/components/ui/DropdownWithLabel'
import { PERFORMANCE_METRIC_GROUPS } from '@/utils/performanceAnalytics'

export const PERFORMANCE_METRIC_DROPDOWN_GROUPS: LabeledDropdownGroup[] =
    PERFORMANCE_METRIC_GROUPS.map((group) => ({
        title: group.title,
        options: group.metrics.map((metric) => ({
            label: metric.label,
            value: metric.id,
            color: metric.color,
        })),
    }))
