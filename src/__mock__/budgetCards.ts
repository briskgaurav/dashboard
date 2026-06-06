export const FLIGHT_FILTER_OPTIONS_FOR_IO_BUDGET = [
  { label: "Flight 1", value: "flight-1" },
  { label: "Flight 2", value: "flight-2" },
  { label: "Flight 3", value: "flight-3" },
] as const;
export const FLIGHT_FILTER_OPTIONS_FOR_DEAL_BUDGET = [] as const;

export const IO_BUDGET = {
  gauge: {
    value: 132_000,
    maxValue: 174_000,
    displayValue: "132K",
    maxLabel: "174K",
  },
  averagePacing: "90.9%",
  projectedPacing: "95.5%",
  expandedMetrics: [
    { id: "even-daily-spend", value: "$4,200" },
    { id: "average-daily-spend", value: "$4,850" },
    { id: "daily-spend-budget", value: "$5,100" },
  ],
  footerMetrics: [
    { id: "io-budget", value: "$174,000" },
    { id: "remaining-budget", value: "$42,000" },
    { id: "daily-increase-needed", value: "$1,200" },
  ],
} as const;

export const DEAL_BUDGET = {
  gauge: {
    value: 132_000,
    maxValue: 174_000,
    displayValue: "132K",
    maxLabel: "174K",
  },
  averagePacing: "90.9%",
  projectedPacing: "95.5%",
  expandedMetrics: [
    { id: "even-daily-spend", value: "$3,800" },
    { id: "average-daily-spend", value: "$4,400" },
    { id: "daily-spend-budget", value: "$4,900" },
  ],
  footerMetrics: [
    { id: "deal-budget", value: "$174,000" },
    { id: "remaining-budget", value: "$42,000" },
    { id: "daily-increase-needed", value: "$980" },
  ],
} as const;
