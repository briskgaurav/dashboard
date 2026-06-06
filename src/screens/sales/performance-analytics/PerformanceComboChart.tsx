"use client";

import { type ZoomState } from "@/hooks/usePerformanceChartBrush";
import {
    type PerformanceChartMetric,
    type PerformanceChartPoint,
} from "@/utils/performanceAnalytics";
import {
    Bar,
    Brush,
    CartesianGrid,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { tv } from "tailwind-variants";
import { formatCount } from '@/utils/performanceChart/formatters'
import ChartTooltip from "./ChartTooltip";

const comboChart = tv({
    slots: {
        section: "flex min-h-0 flex-1 flex-col gap-2",
        zoomRow: "flex items-center gap-2",
        zoomButton:
            "cursor-pointer rounded-md border border-border bg-background-secondary px-3 py-1 text8 font-medium text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background-secondary",
        chartWrap: "h-[48vh] w-full min-h-[320px] max-lg:min-h-[240px]",
        axisLabel: "fill-primary text-[.65vw] font-medium max-lg:text-[10px]",
        empty: "flex h-full items-center justify-center text8 text-disabled",
    },
});

export interface PerformanceComboChartProps {
    data: PerformanceChartPoint[];
    activeMetrics: PerformanceChartMetric[];
    axisDomains: { count: number[]; amount: number[]; percent: number[] };
    visibleRange: { startIndex: number; endIndex: number };
    zoomState: ZoomState;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onBrushChange: (range: { startIndex?: number; endIndex?: number }) => void;
}

export default function PerformanceComboChart({
    data,
    activeMetrics,
    axisDomains,
    visibleRange,
    zoomState,
    onZoomIn,
    onZoomOut,
    onBrushChange,
}: PerformanceComboChartProps) {
    const slots = comboChart();

    const showCountAxis = activeMetrics.some((metric) => metric.axis === "count");
    const showAmountAxis = activeMetrics.some(
        (metric) => metric.axis === "amount",
    );
    const showPercentAxis = activeMetrics.some(
        (metric) => metric.axis === "percent",
    );

    return (
        <div className={slots.section()}>
            <div className={slots.zoomRow()}>
                <button
                    type="button"
                    data-testid="zoom-in-button"
                    aria-label="Zoom in"
                    className={slots.zoomButton()}
                    disabled={!zoomState.canZoomIn}
                    onClick={onZoomIn}
                >
                    Zoom in
                </button>
                <button
                    type="button"
                    data-testid="zoom-out-button"
                    aria-label="Zoom out"
                    className={slots.zoomButton()}
                    disabled={!zoomState.canZoomOut}
                    onClick={onZoomOut}
                >
                    Zoom out
                </button>
            </div>

            <div className={slots.chartWrap()}>
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 8,
                                right: showPercentAxis && showAmountAxis ? 72 : 48,
                                left: 4,
                                bottom: 4,
                            }}
                        >
                            <CartesianGrid
                                stroke="#e5e7eb"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 10, fill: "#1f316d" }}
                                axisLine={{ stroke: "#e5e7eb" }}
                                tickLine={false}
                                interval="preserveStartEnd"
                            />

                            {showCountAxis ? (
                                <YAxis
                                    yAxisId="count"
                                    orientation="left"
                                    tickFormatter={formatCount}
                                    tick={{ fontSize: 10, fill: "#1f316d" }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={axisDomains.count}
                                    label={{
                                        value: "Count",
                                        angle: -90,
                                        position: "insideLeft",
                                        className: slots.axisLabel(),
                                    }}
                                />
                            ) : null}

                            {showAmountAxis ? (
                                <YAxis
                                    yAxisId="amount"
                                    orientation="right"
                                    tickFormatter={(value: number) => `$${value}`}
                                    tick={{ fontSize: 10, fill: "#1f316d" }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={axisDomains.amount}
                                    label={{
                                        value: "Amount ($)",
                                        angle: 90,
                                        position: "insideRight",
                                        offset: showPercentAxis ? 24 : 0,
                                        className: slots.axisLabel(),
                                    }}
                                />
                            ) : null}

                            {showPercentAxis ? (
                                <YAxis
                                    yAxisId="percent"
                                    orientation="right"
                                    tickFormatter={(value: number) => `${value.toFixed(1)}%`}
                                    tick={{ fontSize: 10, fill: "#1f316d" }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={axisDomains.percent}
                                    label={{
                                        value: "Percentage",
                                        angle: 90,
                                        position: "insideRight",
                                        offset: showAmountAxis ? -12 : 0,
                                        className: slots.axisLabel(),
                                    }}
                                />
                            ) : null}

                            <Tooltip content={<ChartTooltip />} />

                            {activeMetrics
                                .filter((metric) => metric.type === "bar")
                                .map((metric) => (
                                    <Bar
                                        key={metric.id}
                                        yAxisId={metric.axis}
                                        dataKey={metric.id}
                                        fill={metric.color}
                                        radius={[4, 4, 0, 0]}
                                        barSize={28}
                                    />
                                ))}

                            {activeMetrics
                                .filter((metric) => metric.type === "line")
                                .map((metric) => (
                                    <Line
                                        key={metric.id}
                                        yAxisId={metric.axis}
                                        type="monotone"
                                        dataKey={metric.id}
                                        stroke={metric.color}
                                        strokeWidth={2}
                                        strokeDasharray={metric.id === "ctr" ? "6 4" : undefined}
                                        dot={{
                                            r: 3,
                                            fill: metric.color,
                                            strokeWidth: 0,
                                        }}
                                        activeDot={{ r: 4 }}
                                    />
                                ))}

                            <Brush
                                dataKey="label"
                                height={24}
                                stroke="#1f316d"
                                fill="#e8f4fd"
                                travellerWidth={8}
                                startIndex={visibleRange.startIndex}
                                endIndex={visibleRange.endIndex}
                                onChange={onBrushChange}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <div className={slots.empty()}>
                        No data available for the selected filters.
                    </div>
                )}
            </div>
        </div>
    );
}
