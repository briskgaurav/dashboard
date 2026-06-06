import Skeleton from "@/components/ui/Skeleton";
import { tv } from "tailwind-variants";

const loader = tv({
  slots: {
    root: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto",
    panel: "shrink-0 rounded-lg bg-background-secondary padd",
    campaignHeader:
      "flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start",
    campaignTitles: "flex flex-col gap-2 max-lg:w-full",
    campaignActions:
      "flex shrink-0 items-center gap-2 max-lg:w-full max-lg:flex-wrap",
    metadataGrid:
      "flex flex-wrap items-start justify-between gap-x-6 gap-y-4 max-lg:justify-start max-lg:gap-x-4",
    metadataField: "flex flex-col gap-1.5",
    kpiRow:
      "flex h-[45vh] shrink-0 flex-nowrap items-start gap-4 overflow-hidden max-lg:h-auto max-lg:flex-col max-lg:overflow-visible",
    kpiColumn:
      "flex h-full w-[14vw] shrink-0 flex-col gap-4 max-lg:h-auto max-lg:w-full",
    kpiCard:
      "flex h-full flex-col gap-4 rounded-lg bg-background-secondary padd max-lg:min-h-[280px] max-lg:w-full",
    kpiCardWide:
      "h-full shrink-0 rounded-lg w-64 bg-background-secondary padd max-lg:h-auto max-lg:min-h-[280px] max-lg:w-full",
    chartHeader:
      "mb-4 flex items-start justify-between gap-4 max-lg:flex-col max-lg:items-start",
    chartControls:
      "flex shrink-0 items-center gap-3 max-lg:w-full max-lg:flex-wrap",
    filterRow: "mb-4 flex flex-wrap gap-2",
    summaryRow: "mb-4 flex flex-wrap gap-2",
    chartBody: "flex flex-col gap-3",
    chartToolbar: "flex gap-2",
    chartArea:
      "relative h-[48vh] min-h-[320px] w-full overflow-hidden rounded-md bg-background p-4 max-lg:min-h-[240px]",
    chartGrid: "absolute inset-4 flex flex-col justify-between",
    chartBars: "flex h-[75%] items-end justify-between gap-2 px-2",
    chartBrush: "mt-auto h-6 w-full rounded-md",
  },
});

type MetadataSkeletonProps = {
  count: number;
};

function MetadataSkeleton({ count }: MetadataSkeletonProps) {
  const slots = loader();

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={slots.metadataField()}>
          <Skeleton className="h-[1vw] w-[4.5vw] min-w-12" />
          <Skeleton className="h-[0.9vw] w-[6vw] min-w-16" tone="soft" />
        </div>
      ))}
    </>
  );
}

type KpiCardSkeletonProps = {
  className?: string;
  withRing?: boolean;
  withGauge?: boolean;
};

function KpiCardSkeleton({
  className,
  withRing,
  withGauge,
}: KpiCardSkeletonProps) {
  const slots = loader();

  return (
    <div className={slots.kpiCard({ class: className })}>
      <div className="flex items-center gap-2">
        <Skeleton className="size-[2vw] min-h-8 min-w-8 shrink-0 rounded-lg" />
        <Skeleton className="h-[0.9vw] w-[5vw] min-w-16" />
      </div>

      {withRing ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <Skeleton className="size-[9vw] min-h-28 min-w-28 rounded-full" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-full" tone="soft" />
            <Skeleton className="h-3 w-full" tone="soft" />
          </div>
        </div>
      ) : null}

      {withGauge ? (
        <div className="flex flex-1 flex-col items-center justify-end gap-3">
          <Skeleton className="h-[5vw] w-[10vw] min-h-16 min-w-32 rounded-t-full" />
          <div className="flex w-full justify-between px-1">
            <Skeleton className="h-3 w-6" tone="muted" />
            <Skeleton className="h-3 w-8" tone="muted" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-full" tone="soft" />
            <Skeleton className="h-3 w-4/5" tone="soft" />
          </div>
        </div>
      ) : null}

      {!withRing && !withGauge ? (
        <div className="flex flex-1 flex-col justify-between gap-4">
          <Skeleton className="h-[1.5vw] w-[40%] min-h-6" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" tone="soft" />
            <Skeleton className="h-3 w-11/12" tone="soft" />
            <Skeleton className="h-3 w-4/5" tone="soft" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Loader() {
  const slots = loader();
  const barHeights = [
    "45%",
    "68%",
    "52%",
    "82%",
    "61%",
    "74%",
    "58%",
    "88%",
    "63%",
    "70%",
  ];

  return (
    <div
      className={slots.root()}
      role="status"
      aria-busy="true"
      aria-label="Loading dashboard"
    >
      <section className={slots.panel()}>
        <div className={slots.campaignHeader()}>
          <div className={slots.campaignTitles()}>
            <Skeleton className="h-[1.5vw] w-[28vw] min-h-6 max-w-xl" />
            <Skeleton
              className="h-[1.5vw] w-[22vw] min-h-6 max-w-md"
              tone="soft"
            />
          </div>
          <div className={slots.campaignActions()}>
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        </div>

        <div className={`${slots.metadataGrid()} mt-6`}>
          <MetadataSkeleton count={9} />
        </div>
      </section>

      <section className={slots.kpiRow()} aria-hidden="true">
        <div className={slots.kpiColumn()}>
          <KpiCardSkeleton className="h-[48%]" />
          <KpiCardSkeleton className="h-[52%]" />
        </div>
        <KpiCardSkeleton className={slots.kpiCardWide()} withRing />
        <KpiCardSkeleton className={slots.kpiCardWide()} withGauge />
        <KpiCardSkeleton className={slots.kpiCardWide()} withGauge />
      </section>

      <section className={slots.panel()}>
        <div className={slots.chartHeader()}>
          <Skeleton className="h-[1.5vw] w-[12vw] min-h-6 max-w-44" />
          <div className={slots.chartControls()}>
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-8 w-28 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="size-6 rounded-md" />
          </div>
        </div>

        <div className={slots.filterRow()}>
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="h-7 w-22 rounded-md" />
          ))}
        </div>

        <div className={slots.summaryRow()}>
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-32 rounded-full" />
          ))}
        </div>

        <div className={slots.chartBody()}>
          <div className={slots.chartToolbar()}>
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>

          <div className={slots.chartArea()}>
            <div className={slots.chartGrid()}>
              <div className="flex flex-1 flex-col justify-between opacity-40">
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="h-px w-full rounded-none"
                    tone="muted"
                  />
                ))}
              </div>
              <div className={slots.chartBars()}>
                {barHeights.map((height, index) => (
                  <Skeleton
                    key={index}
                    className="w-full max-w-7 rounded-t-md"
                    style={{ height }}
                  />
                ))}
              </div>
              <Skeleton className={slots.chartBrush()} tone="soft" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
