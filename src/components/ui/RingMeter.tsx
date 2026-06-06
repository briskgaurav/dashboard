'use client'

import { useEffect, useId, useState } from 'react'
import { tv } from 'tailwind-variants'

const ringMeter = tv({
    slots: {
        wrapper: 'inline-flex w-full flex-col items-center gap-6',
        root: 'relative inline-flex shrink-0 items-center justify-center',
        svg: 'block origin-center',
        content: 'absolute inset-0 flex flex-col items-center justify-center gap-1',
        value: 'text20 font-semibold leading-none text-primary',
        label: 'text10 font-medium text-primary',
        legend: 'flex w-full flex-col gap-1',
        legendRow: 'flex items-center justify-between gap-2',
        legendLeft: 'flex items-center gap-2',
        dot: 'size-2.5 shrink-0 rounded-full',
        legendLabel: 'text8 text-disabled',
        legendValue: 'text8 font-semibold text-foreground',
    },
})

export interface RingMeterProps {
    filledValue: number
    totalValue: number
    label: string
    filledLabel: string
    totalLabel: string
    size?: number
    strokeWidth?: number
    trackColor?: string
    filledColor?: string
    gradientStart?: string
    gradientEnd?: string
    rotation?: number
    className?: string
}

function formatValue(value: number) {
    return value.toLocaleString('en-US')
}

// Animated ring meter component with percent, labels and legend
export default function RingMeter({
    filledValue,
    totalValue,
    label,
    filledLabel,
    totalLabel,
    size = 180,
    strokeWidth = 20,
    trackColor = 'var(--ring-track)',
    filledColor = 'var(--ring-end)',
    gradientStart = 'var(--ring-start)',
    gradientEnd = 'var(--ring-end)',
    rotation = 90,
    className,
}: RingMeterProps) {
    const gradientId = useId()
    const slots = ringMeter()

    const percent = totalValue > 0 ? (filledValue / totalValue) * 100 : 0
    const clamped = Math.min(100, Math.max(0, percent))
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const frame = requestAnimationFrame(() => setProgress(clamped))
        return () => cancelAnimationFrame(frame)
    }, [clamped])

    const displayValue = Math.round(progress)
    const radius = (size - strokeWidth) / 2
    const center = size / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    const legend = [
        { label: filledLabel, value: filledValue, color: filledColor },
        { label: totalLabel, value: totalValue, color: trackColor },
    ]

    return (
        <div className={slots.wrapper({ class: className })}>
            <div
                className={slots.root()}
                style={{ width: size, height: size }}
                role="img"
                aria-label={`${displayValue}% ${label}`}
            >
                <svg
                    className={slots.svg()}
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    aria-hidden
                >
                    <defs>
                        <linearGradient
                            id={gradientId}
                            x1="0%"
                            y1="100%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={gradientStart} />
                            <stop offset="100%" stopColor={gradientEnd} />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke={`url(#${gradientId})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-[stroke-dashoffset] duration-700 ease-out"
                    />
                </svg>
                <div className={slots.content()}>
                    <span className={slots.value()}>{displayValue}%</span>
                    <span className={slots.label()}>{label}</span>
                </div>
            </div>
            <ul className={slots.legend()} aria-label={`${label} breakdown`}>
                {legend.map((item) => (
                    <li key={item.label} className={slots.legendRow()}>
                        <div className={slots.legendLeft()}>
                            <span
                                className={slots.dot()}
                                style={{ backgroundColor: item.color }}
                                aria-hidden
                            />
                            <span className={slots.legendLabel()}>
                                {item.label}
                            </span>
                        </div>
                        <span className={slots.legendValue()}>
                            {formatValue(item.value)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
