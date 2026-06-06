"use client";

import FilterDropdown from "@/components/ui/FilterDropdown";
import { X } from "lucide-react";
import { tv } from "tailwind-variants";
import { usePerformanceChart } from './context/PerformanceChartContext'
import { FILTER_OPTIONS } from '@/utils/performanceChart/constants'

const filtersRow = tv({
  slots: {
    root: "flex flex-wrap items-center gap-2",
    clearAllButton:
      "flex shrink-0 cursor-pointer items-center gap-1 text8 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  },
});

export default function PerformanceFiltersRow() {
  const slots = filtersRow();
  const {
    isThirdPartyMode,
    packageFilter,
    setPackageFilter,
    placementFilter,
    setPlacementFilter,
    targetingFilter,
    setTargetingFilter,
    creativeFilter,
    setCreativeFilter,
    productFilter,
    setProductFilter,
    dspFilter,
    setDspFilter,
    dealFilter,
    setDealFilter,
    hasActiveFilters,
    handleClearAllFilters,
  } = usePerformanceChart();

  return (
    <div className={slots.root()}>
      <FilterDropdown
        label="Packages"
        values={packageFilter}
        options={FILTER_OPTIONS.packages}
        onChange={setPackageFilter}
      />

      {isThirdPartyMode ? (
        <>
          <FilterDropdown
            label="DSP"
            values={dspFilter}
            options={FILTER_OPTIONS.dsp}
            onChange={setDspFilter}
          />
          <FilterDropdown
            label="Deal"
            values={dealFilter}
            options={FILTER_OPTIONS.deal}
            onChange={setDealFilter}
          />
        </>
      ) : (
        <>
          <FilterDropdown
            label="Placements"
            values={placementFilter}
            options={FILTER_OPTIONS.placements}
            onChange={setPlacementFilter}
          />
          <FilterDropdown
            label="Targeting"
            values={targetingFilter}
            options={FILTER_OPTIONS.targeting}
            onChange={setTargetingFilter}
          />
          <FilterDropdown
            label="Creative"
            values={creativeFilter}
            options={FILTER_OPTIONS.creative}
            onChange={setCreativeFilter}
          />
          <FilterDropdown
            label="Product"
            values={productFilter}
            options={FILTER_OPTIONS.product}
            onChange={setProductFilter}
          />
        </>
      )}

      {hasActiveFilters ? (
        <button
          type="button"
          className={slots.clearAllButton()}
          aria-label="Clear all filters"
          onClick={handleClearAllFilters}
        >
          <X className="size-3.5" aria-hidden />
          Clear All
        </button>
      ) : null}
    </div>
  );
}
