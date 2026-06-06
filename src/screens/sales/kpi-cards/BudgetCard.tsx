"use client";

import FilterDropdown from "@/components/ui/FilterDropdown";
import GaugeMeter from "@/components/ui/GaugeMeter";
import BudgetMetricRow, {
  type BudgetMetricId,
} from "@/screens/sales/kpi-cards/BudgetMetricRow";
import { PieChart } from "lucide-react";
import { useState } from "react";
import { tv } from "tailwind-variants";

const budgetCard = tv({
  slots: {
    root:
      "h-[45vh] w-[20vw] overflow-hidden rounded-lg bg-background-secondary max-lg:h-auto max-lg:min-h-[280px] max-lg:w-full",
    body: "flex h-full flex-col gap-4 overflow-y-auto padd",
    header:
      "flex w-full items-center justify-between gap-2 max-lg:flex-wrap max-lg:gap-y-3",
    headerLeft: "flex min-w-0 items-center gap-2",
    iconWrap:
      "flex size-[2vw] items-center justify-center rounded-lg bg-background p-1.5 max-lg:size-8",
    title: "text10 font-semibold text-primary",
    metrics: "flex w-full flex-col gap-2",
    divider: "h-px w-full bg-border",
    toggle: "text8 text-left text-primary font-semibold cursor-pointer",
    footerMetrics: "flex flex-col gap-2",
  },
});

export interface BudgetCardGauge {
  value: number;
  maxValue: number;
  displayValue: string;
  maxLabel: string;
}

export interface BudgetCardMetric {
  id: BudgetMetricId;
  value: string;
  trend?: boolean;
}

export interface BudgetCardProps {
  title: string;
  gauge: BudgetCardGauge;
  averagePacing: string;
  projectedPacing: string;
  expandedMetrics: BudgetCardMetric[];
  footerMetrics: BudgetCardMetric[];
  filterOptions?: { label: string; value: string }[];
}

export default function BudgetCard({
  title,
  gauge,
  averagePacing,
  projectedPacing,
  expandedMetrics,
  footerMetrics,
  filterOptions = [],
}: BudgetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [flightFilter, setFlightFilter] = useState<string[]>([]);
  const slots = budgetCard();

  return (
    <div className={slots.root()}>
      <div className={slots.body()}>
        <div className={slots.header()}>
          <div className={slots.headerLeft()}>
            <div className={slots.iconWrap()}>
              <PieChart
                strokeWidth={3}
                className="size-full text-primary"
                aria-hidden
              />
            </div>
            <p className={slots.title()}>{title}</p>
          </div>

          <FilterDropdown
            label="Flights"
            values={flightFilter}
            options={filterOptions}
            onChange={setFlightFilter}
            ariaLabel="Flights filter"
            emptyMessage="No results"
          />
        </div>

        <GaugeMeter
          value={gauge.value}
          maxValue={gauge.maxValue}
          displayValue={gauge.displayValue}
          maxLabel={gauge.maxLabel}
        />

        <div className={slots.metrics()}>
          <BudgetMetricRow id="average-pacing" value={averagePacing} trend />
          <BudgetMetricRow
            id="projected-pacing"
            value={projectedPacing}
            trend
          />

          <div className={slots.divider()} />

          <button
            type="button"
            className={slots.toggle()}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "See Less" : "See More"}
          </button>

          {isExpanded ? (
            <>
              {expandedMetrics.map((metric) => (
                <BudgetMetricRow
                  key={metric.id}
                  id={metric.id}
                  value={metric.value}
                />
              ))}

              <div className={slots.divider()} />

              <div className={slots.footerMetrics()}>
                {footerMetrics.map((metric) => (
                  <BudgetMetricRow
                    key={metric.id}
                    id={metric.id}
                    value={metric.value}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
