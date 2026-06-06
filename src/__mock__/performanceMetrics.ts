import type { MetricChipTone } from "@/components/ui/MetricChip";

export interface PerformanceMetric {
  label: string;
  value: string;
  tone: MetricChipTone;
}

export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { label: "Big Scroller", value: "0.0%", tone: "yellow" },
  { label: "Sunrise", value: "0.0%", tone: "gray" },
  { label: "Avg CTR", value: "0.7%", tone: "green" },
  { label: "Avg Time Spent", value: "166s", tone: "blue" },
  { label: "Avg VCR", value: "0.0%", tone: "orange" },
];
